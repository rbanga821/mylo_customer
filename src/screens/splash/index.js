/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Block, ImageComponent, Text} from '../../components';
const Splash = () => {
  const nav = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      nav.navigate('Auth');
    }, 2000);
  }, []);
  return (
    <Block safearea center middle secondary>
      <Block flex={false} borderWidth={3} borderRadius={10}>
        <ImageComponent name="logo" height={150} width={150} />
      </Block>
    </Block>
  );
};
export default Splash;
