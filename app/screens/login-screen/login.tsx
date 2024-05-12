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
import {Button, Icon, BottomSheet} from '@rneui/themed';
import {Box, Stack, FormControl, Center, Select, CheckIcon} from 'native-base';
import AwesomeAlert from 'react-native-awesome-alerts';



import {CustomInput} from '../../components/Inputs/CustomInput';
import validateUserData from '../../helpers/validateUserData';
import districts from '../../consts/districts';
import COLORS from '../../consts/colors';

import {Realm, useApp} from '@realm/react';
import {secrets} from '../../secrets';
import {BSON} from 'realm';
import {roles} from '../../consts/roles';
import { errorMessages } from '../../consts/errorMessages';
import {cooperatives} from '../../consts/cooperatives';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Spinner from '../../components/spinner';

export default function WelcomeScreen() {
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
      <View className="bg-[#008000] dark:bg-black pt-3 ">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex flex-row items-center space-x-2 justify-start px-3">
            <View>
              <Image
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 100,
                }}
                source={require('../../../assets/images/iamLogo2.png')}
              />
            </View>
            <View className="">
              <Text className="truncate text-white dark:text-white text-xl font-bold ">
                IAM, IP
              </Text>
            </View>
          </View>

          <View className="flex justify-center items-center py-6">
            <Text className="text-3xl text-white dark:text-white font-bold">
              Connect Caju
            </Text>
          </View>
          <AwesomeAlert
            show={alert}
            showProgress={false}
            title={titleAlert}
            message={messageAlert}
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showCancelButton={showCancelButton}
            showConfirmButton={showConfirmButton}
            cancelText={cancelText}
            confirmText={confirmText}
            cancelButtonColor={COLORS.danger}
            confirmButtonColor={COLORS.main}
            onCancelPressed={() => {
              setAlert(false);
              setErrorFlag(null);
            }}
            onConfirmPressed={() => {
              setAlert(false);
              if (isLoggingIn) {
                // setIsLoggingIn(false);
              } else if (passwordConfirm) {
                //
              } else {
                setIsLoggingIn(true);
                setEmail('');
                setPassword('');
              }
              setErrorFlag(null);
            }}
          />

          {/*------------------------------------
          Data form (for signing in and up)
        */}
          <View className="bg-white rounded-t-[30px] py-6 px-3 flex items-center justify-center">
            <View className="w-full">
              {!isLoggingIn && (
                <FormControl isRequired my="3" isInvalid={'name' in errors}>
                  <FormControl.Label>Nome Completo</FormControl.Label>
                  <CustomInput
                    width="100%"
                    autoFocus={!isLoggingIn ? false : false}
                    placeholder="Nome completo"
                    value={name}
                    type="text"
                    autoCapitalize="words"
                    onChangeText={(newName: any) => {
                      setErrors(prev => ({...prev, name: ''}));
                      setName(newName);
                    }}
                  />
                  {'name' in errors ? (
                    <FormControl.ErrorMessage
                      leftIcon={
                        <Icon name="error-outline" size={16} color="red" />
                      }
                      _text={{fontSize: 'xs'}}>
                      {errors?.name}
                    </FormControl.ErrorMessage>
                  ) : (
                    <FormControl.HelperText></FormControl.HelperText>
                  )}
                </FormControl>
              )}

              <FormControl isRequired isInvalid={'email' in errors}>
                <FormControl.Label>{'Endereço Electrónico'}</FormControl.Label>
                <CustomInput
                  width="100%"
                  placeholder={'Endereço Electrónico'}
                  type={'emailAddress'}
                  keyboardType={'email-address'}
                  value={email}
                  onChangeText={(value: any) => {
                    setErrors(prev => ({...prev, email: ''}));
                    setEmail(value?.toLowerCase()?.trim());
                  }}
                  InputLeftElement={
                    <Icon name="email" color="grey" style={{paddingLeft: 3}} />
                  }
                />
                {'email' in errors ? (
                  <FormControl.ErrorMessage
                    leftIcon={
                      <Icon name="error-outline" size={16} color="red" />
                    }
                    _text={{fontSize: 'xs'}}>
                    {errors?.email}
                  </FormControl.ErrorMessage>
                ) : (
                  <FormControl.HelperText></FormControl.HelperText>
                )}
              </FormControl>
              {isLoggingIn && (
                <FormControl isRequired isInvalid={'password' in errors}>
                  <FormControl.Label>Senha</FormControl.Label>
                  <CustomInput
                    width="100%"
                    placeholder="Senha"
                    secureTextEntry={!showPassword ? true : false}
                    value={password}
                    onChangeText={(newPassword: any) => {
                      setErrors(prev => ({...prev, password: ''}));
                      setPassword(newPassword);
                    }}
                    InputRightElement={
                      <Icon
                        name={showPassword ? 'visibility' : 'visibility-off'}
                        color={COLORS.grey}
                        size={20}
                        style={{paddingRight: 5}}
                        type="material"
                        onPress={() => setShowPassword(prev => !prev)}
                      />
                    }
                  />
                  {'password' in errors ? (
                    <FormControl.ErrorMessage
                      leftIcon={
                        <Icon name="error-outline" size={16} color="red" />
                      }
                      _text={{fontSize: 'xs'}}>
                      {errors?.password}
                    </FormControl.ErrorMessage>
                  ) : (
                    <FormControl.HelperText></FormControl.HelperText>
                  )}
                </FormControl>
              )}
              {!isLoggingIn && (
                <Stack direction="row" w="100%" space={1}>
                  <Box w="50%">
                    <FormControl
                      isRequired
                      my="3"
                      isInvalid={'password' in errors}>
                      <FormControl.Label>Senha</FormControl.Label>
                      <CustomInput
                        width="100%"
                        placeholder="Senha"
                        secureTextEntry={!showPassword ? true : false}
                        value={password}
                        onChangeText={(newPassword: any) => {
                          setErrors(prev => ({...prev, password: ''}));
                          setPassword(newPassword);
                        }}
                        InputRightElement={
                          <Icon
                            name={
                              showPassword ? 'visibility' : 'visibility-off'
                            }
                            color="grey"
                            size={20}
                            style={{paddingRight: 5}}
                            type="material"
                            onPress={() => setShowPassword(prev => !prev)}
                          />
                        }
                      />
                      {'password' in errors ? (
                        <FormControl.ErrorMessage
                          leftIcon={
                            <Icon name="error-outline" size={16} color="red" />
                          }
                          _text={{fontSize: 'xs'}}>
                          {errors?.password}
                        </FormControl.ErrorMessage>
                      ) : (
                        <FormControl.HelperText></FormControl.HelperText>
                      )}
                    </FormControl>
                  </Box>

                  <Box w="50%">
                    <FormControl
                      isRequired
                      my="3"
                      isInvalid={'passwordConfirm' in errors}>
                      <FormControl.Label>Confirmar Senha</FormControl.Label>
                      <CustomInput
                        width="100%"
                        placeholder="Confirmar senha"
                        secureTextEntry={!showPasswordConfirm ? true : false}
                        value={passwordConfirm}
                        onChangeText={(newPasswordConfirm: any) => {
                          setErrors(prev => ({
                            ...prev,
                            passwordConfirm: '',
                          }));
                          setPasswordConfirm(newPasswordConfirm);
                        }}
                        InputRightElement={
                          <Icon
                            name={
                              showPasswordConfirm
                                ? 'visibility'
                                : 'visibility-off'
                            }
                            color={COLORS.grey}
                            size={20}
                            style={{paddingRight: 5}}
                            type="material"
                            onPress={() =>
                              setShowPasswordConfirm(prev => !prev)
                            }
                          />
                        }
                      />
                      {'passwordConfirm' in errors ? (
                        <FormControl.ErrorMessage
                          leftIcon={
                            <Icon name="error-outline" size={16} color="red" />
                          }
                          _text={{fontSize: 'xs'}}>
                          {errors?.passwordConfirm}
                        </FormControl.ErrorMessage>
                      ) : (
                        <FormControl.HelperText></FormControl.HelperText>
                      )}
                    </FormControl>
                  </Box>
                </Stack>
              )}
              {!isLoggingIn && (
                <Stack direction="row" w="100%" space={1}>
                  <Box w="100%">
                    <FormControl
                      isRequired
                      my="3"
                      isInvalid={'phone' in errors}>
                      <FormControl.Label>Telemóvel</FormControl.Label>
                      <CustomInput
                        width="100%"
                        type="telephoneNumber"
                        placeholder="Telemóvel"
                        keyboardType="phone-pad"
                        value={phone}
                        onChangeText={(newPhone: any) => {
                          setErrors(prev => ({...prev, phone: ''}));
                          setPhone(newPhone);
                        }}
                        InputLeftElement={
                          <Icon
                            name="phone"
                            color={COLORS.grey}
                            size={30}
                            type="material"
                            onPress={() =>
                              setShowPasswordConfirm(prev => !prev)
                            }
                          />
                        }
                      />
                      {'phone' in errors ? (
                        <FormControl.ErrorMessage
                          leftIcon={
                            <Icon name="error-outline" size={16} color="red" />
                          }
                          _text={{fontSize: 'xs'}}>
                          {errors?.phone}
                        </FormControl.ErrorMessage>
                      ) : (
                        <FormControl.HelperText></FormControl.HelperText>
                      )}
                    </FormControl>
                  </Box>
                </Stack>
              )}
              {!isLoggingIn && (
                <>
                  <Stack direction="row" w="100%">
                    <Box w="100%">
                      <FormControl
                        isRequired
                        my="3"
                        isInvalid={'role' in errors}>
                        <FormControl.Label>Perfil</FormControl.Label>
                        <Select
                          selectedValue={role}
                          // @ts-expect-error TS(2322): Type '{ children: Element[]; selectedValue: string... Remove this comment to see the full error message
                          accessibilityLabel="Escolha seu perfil"
                          placeholder="Escolha seu perfil"
                          _selectedItem={{
                            bg: 'teal.600',
                            fontSize: 'lg',
                            endIcon: <CheckIcon size="5" />,
                          }}
                          dropdownCloseIcon={
                            role ? (
                              <Icon
                                name="close"
                                size={25}
                                color="grey"
                                onPress={() => {
                                  setRole('');
                                }}
                              />
                            ) : (
                              <Icon
                                size={25}
                                name="arrow-drop-down"
                                color="#005000"
                              />
                            )
                          }
                          mt={1}
                          onValueChange={newRole => {
                            setErrors(prev => ({...prev, role: ''}));
                            setRole(newRole);
                          }}>
                          <Select.Item
                            label={roles.fieldAgent}
                            value={roles.fieldAgent}
                          />
                          <Select.Item
                            label={roles.provincialManager}
                            value={roles.provincialManager}
                          />
                          <Select.Item
                            label={roles.coopManager}
                            value={roles.coopManager}
                          />
                          <Select.Item
                            label={roles.ampcmSupervisor}
                            value={roles.ampcmSupervisor}
                          />
                        </Select>
                        {'role' in errors ? (
                          <FormControl.ErrorMessage
                            leftIcon={
                              <Icon
                                name="error-outline"
                                size={16}
                                color="red"
                              />
                            }
                            _text={{fontSize: 'xs'}}>
                            {errors?.role}
                          </FormControl.ErrorMessage>
                        ) : (
                          <FormControl.HelperText></FormControl.HelperText>
                        )}
                      </FormControl>
                    </Box>
                  </Stack>

                  <View
                    className="flex flex-row"
                    >
                    <View
                      className='flex flex-row'
                      >
                      <FormControl
                        isRequired
                        my="3"
                        isInvalid={'userProvince' in errors}>
                        <FormControl.Label>Província</FormControl.Label>
                        <Select
                          selectedValue={userProvince}
                          accessibilityLabel="Escolha sua província"
                          placeholder="Escolha sua província"
                          _selectedItem={{
                            bg: 'teal.600',
                            fontSize: 'lg',
                            endIcon: <CheckIcon size="5" />,
                          }}
                          dropdownCloseIcon={
                            userProvince ? (
                              <Icon
                                name="close"
                                size={25}
                                color="grey"
                                onPress={() => {
                                  if (!role.includes(roles.provincialManager)) {
                                    setUserDistrict('');
                                  }
                                  setUserProvince('');
                                }}
                              />
                            ) : (
                              <Icon
                                size={25}
                                name="arrow-drop-down"
                                color="#005000"
                              />
                            )
                          }
                          mt={1}
                          onValueChange={newProvince => {
                            setErrors(prev => ({
                              ...prev,
                              userProvince: '',
                            }));
                            if (!role.includes(roles.provincialManager)) {
                              setUserDistrict('');
                            }
                            setUserProvince(newProvince);
                          }}>
                          <Select.Item
                            label="Cabo Delgado"
                            value="Cabo Delgado"
                          />
                          <Select.Item label="Nampula" value="Nampula" />
                          <Select.Item label="Niassa" value="Niassa" />
                          <Select.Item label="Zambézia" value="Zambézia" />
                        </Select>
                        {'userProvince' in errors ? (
                          <FormControl.ErrorMessage
                            leftIcon={
                              <Icon
                                name="error-outline"
                                size={16}
                                color="red"
                              />
                            }
                            _text={{fontSize: 'xs'}}>
                            {errors?.userProvince}
                          </FormControl.ErrorMessage>
                        ) : (
                          <FormControl.HelperText></FormControl.HelperText>
                        )}
                      </FormControl>
                    </View>
                    {!role.includes(roles.provincialManager) && (
                      <View w="50%">
                        <FormControl
                          isRequired
                          my="3"
                          isInvalid={'userDistrict' in errors}>
                          <FormControl.Label>Distrito</FormControl.Label>
                          <Select
                            selectedValue={userDistrict}
                            // @ts-expect-error TS(2322): Type '{ children: Element[]; selectedValue: string... Remove this comment to see the full error message
                            accessibilityLabel="Escolha seu distrito"
                            placeholder="Escolha seu distrito"
                            _selectedItem={{
                              bg: 'teal.600',
                              fontSize: 'lg',
                              endIcon: <CheckIcon size="5" />,
                            }}
                            dropdownCloseIcon={
                              userDistrict ? (
                                <Icon
                                  name="close"
                                  size={25}
                                  color="grey"
                                  onPress={() => setUserDistrict('')}
                                />
                              ) : (
                                <Icon
                                  size={25}
                                  name="arrow-drop-down"
                                  color="#005000"
                                />
                              )
                            }
                            mt={1}
                            onValueChange={newDistrict => {
                              setErrors(prev => ({
                                ...prev,
                                userDistrict: '',
                              }));
                              setUserDistrict(newDistrict);
                            }}>
                            {selectedDistricts?.map((district, index) => (
                              <Select.Item
                                key={index}
                                label={district}
                                value={district}
                              />
                            ))}
                          </Select>
                          {'userDistrict' in errors ? (
                            <FormControl.ErrorMessage
                              leftIcon={
                                <Icon
                                  name="error-outline"
                                  size={16}
                                  color="red"
                                />
                              }
                              _text={{fontSize: 'xs'}}>
                              {errors?.userDistrict}
                            </FormControl.ErrorMessage>
                          ) : (
                            <FormControl.HelperText></FormControl.HelperText>
                          )}
                        </FormControl>
                      </Box>
                    )}
                  </View>
                </>
              )}

              {role.includes(roles.coopManager) &&
                userDistrict &&
                !isLoggingIn && (
                  <View className='flex flex-row'>
                    <View className='w-full'>
                      <FormControl
                        isRequired
                        my="3"
                        isInvalid={'coop' in errors}>
                        <FormControl.Label>Nome da Entidade</FormControl.Label>
                        <Select
                          selectedValue={coop}
                          accessibilityLabel="Escolha sua entidade"
                          placeholder="Escolha sua entidade"
                          _selectedItem={{
                            bg: 'teal.600',
                            fontSize: 'lg',
                            endIcon: <CheckIcon size="5" />,
                          }}
                          dropdownCloseIcon={
                            coop ? (
                              <Icon
                                name="close"
                                size={25}
                                color="grey"
                                onPress={() => {
                                  setCoop('');
                                }}
                              />
                            ) : (
                              <Icon
                                size={25}
                                name="arrow-drop-down"
                                color="#005000"
                              />
                            )
                          }
                          mt={1}
                          onValueChange={newCoop => {
                            setErrors(prev => ({...prev, coop: ''}));
                            setCoop(newCoop);
                          }}>
                          {cooperatives[userDistrict]?.map(
                            (coop: any, index: any) => (
                              <Select.Item
                                key={coop}
                                label={coop}
                                value={coop}
                              />
                            ),
                          )}
                        </Select>
                        {'coop' in errors ? (
                          <FormControl.ErrorMessage
                            leftIcon={
                              <Icon
                                name="error-outline"
                                size={16}
                                color="red"
                              />
                            }
                            _text={{fontSize: 'xs'}}>
                            {errors?.coop}
                          </FormControl.ErrorMessage>
                        ) : (
                          <FormControl.HelperText></FormControl.HelperText>
                        )}
                      </FormControl>
                    </View>
                  </View>
                )}

              <Center w="100%" py="8">
                <PrimaryButton
                  onPress={async () => {
                    setSigningInInProgress(true);
                    if (isLoggingIn) {
                      await onLogin(email, password);
                    } else {
                      await onSignUp(
                        name,
                        email,
                        password,
                        passwordConfirm,
                        phone,
                        role,
                        userDistrict,
                        userProvince,
                        coop,
                      );
                    }
                    setSigningInInProgress(false);
                  }}
                  disabled={
                    !email || !password || signingInInProgress ? true : false
                  }
                  title={isLoggingIn ? 'Entrar' : 'Registar-se'}
                />
              </Center>
            </View>

            <View className='w-full flex flex-row'>
              {isLoggingIn && (
                <View className='flex justify-center items-center'>
                  <View
                    style={{
                      paddingTop: 10,
                      paddingBottom: 20,
                    }}>
                    <Pressable
                      disabled
                      onPress={() => {}}>
                      <Text
                        style={{
                          fontFamily: 'JosefinSans-Regular',
                          color: COLORS.grey,
                        }}>
                        Esqueceu senha?
                      </Text>
                    </Pressable>
                  </View>

                  <View
                    className='flex flex-row px-5'
                    >
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 16,
                        color: COLORS.grey,
                        fontFamily: 'JosefinSans-Regular',
                        marginHorizontal: 5,
                      }}>
                      Ainda não tem conta?
                    </Text>
                    <Pressable
                      onPress={() => {
                        setLoadingActivityIndicator(true);
                        setIsLoggingIn(prevState => !prevState);
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: 16,
                          color: COLORS.main,
                          fontFamily: 'JosefinSans-Regular',
                          marginHorizontal: 5,
                        }}>
                        Criar conta
                      </Text>
                    </Pressable>
                  </View>
                </View>
              )}

              {!isLoggingIn && (
                <View className="flex justify-center items-center pt-3">
                  <View className="flex justify-center items-center">
                    <Text
                      className='text-center text-[16px] text-[#008000] mx-4'
                      >
                      Já tem conta?
                    </Text>
                    <Pressable
                      onPress={() => {
                        setLoadingActivityIndicator(true);
                        setIsLoggingIn(prevState => !prevState);
                      }}>
                      <Text className="text-center tex-[16px] text-[#008000] underline">
                        Fazer Login
                      </Text>
                    </Pressable>
                  </View>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
      <StatusBar barStyle="dark-content" backgroundColor="#008000" />
    </SafeAreaProvider>
  );
}
