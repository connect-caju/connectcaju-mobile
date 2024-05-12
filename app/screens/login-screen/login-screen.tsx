import {
  Pressable,
  SafeAreaView,
  Text,
  View,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';

import AwesomeAlert from 'react-native-awesome-alerts';
import {
  Button,
  ButtonText,
  ButtonIcon,
  ButtonSpinner,
  ButtonGroup,
  Input,
  Icon,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlLabelText,
  FormControlErrorText,
  FormControlLabel,
  Box,
  HStack,
  InputField,
  FormControlHelper,
  FormControlHelperText,
  AlertCircleIcon,
} from '@gluestack-ui/themed';

import {Realm, useApp} from '@realm/react';

import {BSON} from 'realm';
import {errorMessages} from '../../consts/errorMessages';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Spinner from '../../components/spinner';
import validateUserData from '../../helpers/validateUserData';
import districts from '../../consts/districts';
import {roles} from '../../consts/roles';
import {secrets} from '../../realm/secrets';
import {cooperatives} from '../../consts/cooperatives';
import {capitalize} from '../../helpers/capitalize';

export default function LoginScreen() {
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  // ------------------------------------------
  const [alert, setAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState('');
  const [titleAlert, setTitleAlert] = useState('');
  const [cancelText, setCancelText] = useState('');
  const [confirmText, setConfirmText] = useState('');
  const [showCancelButton, setShowCancelButton] = useState(false);
  const [showConfirmButton, setShowConfirmButton] = useState(false);
  const [errorFlag, setErrorFlag] = useState(null);

  // ---------------------------------------------
  const [errors, setErrors] = useState({});

  const [role, setRole] = useState(roles.fieldAgent);
  const [userProvince, setUserProvince] = useState('');
  const [userDistrict, setUserDistrict] = useState('');
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [coop, setCoop] = useState('');

  const [phone, setPhone] = useState(null);

  // ----------------------------------------------------
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const [signingInInProgress, setSigningInInProgress] = useState(false);

  const toggleBottomSheet = () => {
    setBottomSheetVisible(!bottomSheetVisible);
  };
  // ---------------------------------------------------

  const [loadingActivitiyIndicator, setLoadingActivityIndicator] =
    useState(false);

  const app = useApp();

  // on user login
  const onLogin = useCallback(
    async (email: any, password: any) => {
      try {
        let hashedPassword = password;
        if (!app?.currentUser) {
          const creds = Realm.Credentials.emailPassword(
            email,
            // password,
            hashedPassword,
          );
          await app?.logIn(creds);
        }
        return app.currentUser;
      } catch (error) {
        setAlert(true);

        // @ts-expect-error TS(2345): Argument of type 'unknown' is not assignable to pa... Remove this comment to see the full error message
        setErrorFlag(error);
        return;
      }
      // setSigningInInProgress(false);
    },
    [app, email, password],
  );

  // on user registration
  const onSignUp = useCallback(
    async (
      newName: any,
      newEmail: any,
      newPassword: any,
      newPasswordConfirm: any,
      newPhone: any,
      newRole: any,
      newUserDistrict: any,
      newUserProvince: any,
      newCoop: any,
    ) => {
      // pack user data into an object
      const userData = {
        name: newName,
        email: newEmail,
        password: newPassword,
        passwordConfirm: newPasswordConfirm,
        phone: newPhone,
        role: newRole,
        userDistrict: newUserDistrict,
        userProvince: newUserProvince,
        coop: newCoop,
      };

      // validate user data and return nothing if any error is found
      if (!(await validateUserData(userData, errors, setErrors))) {
        return;
      }

      // extract validated user data
      const {
        name,

        email,

        password,

        phone,

        role,

        userDistrict,

        userProvince,

        coop,
      } = await validateUserData(userData, errors, setErrors);

      // setSigningInInProgress(true)
      // try to register new user
      try {
        // remove any current user
        // app?.currentUser?.logOut();

        await app.emailPasswordAuth.registerUser({email, password});

        const creds = Realm.Credentials.emailPassword(email, password);
        const newUser = await app.logIn(creds);
        const mongo = newUser.mongoClient(secrets.serviceName);
        const collection = mongo
          .db(secrets.databaseName)
          .collection(secrets.userCollectionName);

        // pack the validated user data and save it into the database
        const validatedUserdata = {
          _id: new BSON.ObjectID(),
          userId: newUser.id,
          name,
          email,
          password,
          phone,
          role:
            role?.includes(roles.coopManager) && coop !== 'AMPCM'
              ? `${role} [${coop}]`
              : role,
          userDistrict,
          userProvince,
          image: '',
          lastLoginAt: new Date(),
          createdAt: new Date(),
        };

        // save custom user data
        const result = await collection.insertOne(validatedUserdata);
        const customUserData = await newUser.refreshCustomData();
      } catch (error) {
        setAlert(true);
        console.log('error: ', {cause: error});
        // @ts-expect-error TS(2345): Argument of type 'unknown' is not assignable to pa... Remove this comment to see the full error message

        setErrorFlag(error);
        return;
      }
      // setSigningInInProgress(false);
    },
    [app, email, password],
  );

  useEffect(() => {
    if (
      alert &&
      // @ts-expect-error TS(2339): Property 'toString' does not exist on type 'never'... Remove this comment to see the full error message
      (errorFlag?.toString()?.includes(errorMessages.signIn.logUsernameFlag) ||
        // @ts-expect-error TS(2339): Property 'toString' does not exist on type 'never'... Remove this comment to see the full error message
        errorFlag?.toString()?.includes(errorMessages.signIn.logPasswordFlag))
    ) {
      setTitleAlert(errorMessages.signIn.title);
      setMessageAlert(errorMessages.signIn.message);
      setShowCancelButton(errorMessages.signIn.showCancelButton);
      setShowConfirmButton(errorMessages.signIn.showConfirmButton);
      setConfirmText(errorMessages.signIn.confirmText);
      setCancelText(errorMessages.signIn.cancelText);
    } else if (
      alert &&
      // @ts-expect-error TS(2339): Property 'toString' does not exist on type 'never'... Remove this comment to see the full error message
      errorFlag?.toString()?.includes(errorMessages.network.logFlag)
    ) {
      setTitleAlert(errorMessages.network.title);
      setMessageAlert(errorMessages.network.message);
      setShowCancelButton(errorMessages.network.showCancelButton);
      setShowConfirmButton(errorMessages.network.showConfirmButton);
      setConfirmText(errorMessages.network.confirmText);
      setCancelText(errorMessages.network.cancelText);
    } else if (
      alert &&
      // @ts-expect-error TS(2339): Property 'toString' does not exist on type 'never'... Remove this comment to see the full error message
      errorFlag?.toString()?.includes(errorMessages.signUp.logFlag)
    ) {
      setTitleAlert(errorMessages.signUp.title);
      setMessageAlert(errorMessages.signUp.message);
      setShowCancelButton(errorMessages.signUp.showCancelButton);
      setShowConfirmButton(errorMessages.signUp.showConfirmButton);
      setConfirmText(errorMessages.signUp.confirmText);
      setCancelText(errorMessages.signUp.cancelText);
    } else if (alert) {
      setTitleAlert(errorMessages.server.title);
      setMessageAlert(errorMessages.server.message);
      setShowCancelButton(errorMessages.server.showCancelButton);
      setShowConfirmButton(errorMessages.server.showConfirmButton);
      setConfirmText(errorMessages.server.confirmText);
      setCancelText(errorMessages.server.cancelText);
    }
  }, [errorFlag, alert]);

  useEffect(() => {
    if (userProvince) {
      setSelectedDistricts(districts[userProvince]);
    }
  }, [userProvince, errors, isLoggingIn]);

  if (loadingActivitiyIndicator) {
    return (
      <Spinner
      // loadingActivitiyIndicator={loadingActivitiyIndicator}
      // setLoadingActivityIndicator={setLoadingActivityIndicator}
      />
    );
  }
  return (
    <SafeAreaProvider>
      <View className="flex-1 h-full justify-center items-center p-3">
        <HStack className="w-full">
          <FormControl>
            <FormControlLabel>
              <FormControlLabelText>Email</FormControlLabelText>
            </FormControlLabel>

            <Input>
              <InputField
                type="text"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                className='border rounded-xl text-[18px]'
                keyboardType="email-address"
              />
            </Input>
            <FormControlHelper>
              <FormControlHelperText>
                Must be at least 6 characters
              </FormControlHelperText>
            </FormControlHelper>
            <FormControlError>
              <FormControlErrorIcon size={"md"} as={AlertCircleIcon} />
              <FormControlErrorText>
                At least 6 characters
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
        </HStack>
      </View>
      <StatusBar barStyle="dark-content" backgroundColor="#008000" />
    </SafeAreaProvider>
  );
}
