import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Block, Button, ImageComponent, Input, Text} from '../../../components';
import {useNavigation} from '@react-navigation/native';
import Otp from '../../../components/otp';
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {loginRequest, registerRequest} from '../../../redux/action';
import messaging from '@react-native-firebase/messaging';

const Register = ({
  route: {
    params: {phone_no},
  },
}) => {
  const nav = useNavigation();
  const [counter, setCounter] = useState(59);
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const isLoad = useSelector((state) => state.user.register.loading);
  const isResendLoad = useSelector((state) => state.user.login.loading);

  // First Attempts
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

    return () => clearInterval(timer);
  }, [counter]);

  const verifyOtp = async () => {
    const fcmToken = await messaging().getToken();
    const data = {
      otp: value,
      phone_no: phone_no,
      social_type: 'N',
      token: fcmToken,
    };
    dispatch(registerRequest(data));
  };

  const resendOtp = () => {
    dispatch(loginRequest(phone_no));
  };
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={hp(5)}
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <>
        <Block
          onStartShouldSetResponder={() => Keyboard.dismiss()}
          white
          safearea>
          <Block padding={[hp(4), 0, 0, 0]} center flex={false}>
            <ImageComponent name="logo" height={100} width={100} radius={20} />
            <Text margin={[hp(3), wp(8), 0, wp(8)]} h3 center>
              Enter the OTP received on your register mobile number
              {/* We just sent you a verified code via a phone xxxxxx391 */}
            </Text>
          </Block>
          <Block padding={[hp(6), wp(5), 0, wp(5)]} flex={false}>
            <Otp value={value} setValue={(a) => setValue(a)} />
            <Block flex={false} row space="between" margin={[hp(2), 0, 0, 0]}>
              {counter > 0 && (
                <Text errorColor h3>
                  Expired {'00:'}
                  {counter}
                </Text>
              )}
              {isResendLoad ? (
                <ActivityIndicator size="small" color="#000" />
              ) : (
                <TouchableOpacity onPress={() => resendOtp()}>
                  <Text h3>Resend OTP</Text>
                </TouchableOpacity>
              )}
            </Block>
            <Text
              onPress={() => nav.goBack()}
              body
              style={{alignSelf: 'center'}}
              transform="uppercase"
              secondary
              margin={[hp(2), 0, 0, 0]}>
              Change phone number
            </Text>
          </Block>
        </Block>
        <Block primary padding={[0, wp(3), 0, wp(3)]} flex={false}>
          <Button
            isLoading={isLoad}
            disabled={value.length < 6}
            onPress={() => verifyOtp()}
            color="secondary">
            VERIFY OTP
          </Button>
        </Block>
      </>
    </KeyboardAvoidingView>
  );
};

export default Register;
