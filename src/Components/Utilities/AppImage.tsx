import {
  View,
  Text,
  ImageResizeMode,
  ImageStyle,
  ImageProps,
  ImageRequireSource,
  ImageURISource,
} from 'react-native';
import React from 'react';
import {ImageSourcePropType} from 'react-native';
import {Image} from 'react-native';

type AppImageProps = ImageProps & {
  source: ImageRequireSource | ImageURISource;
  resizeMode?: ImageResizeMode;
  customStyle?: ImageStyle;
  w?: number;
  h?: number;
};

const AppImage = ({
  source,
  resizeMode = 'contain',
  customStyle,
  h,
  w,
  ...Props
}: AppImageProps) => {
  return (
    <Image
      source={source}
      resizeMode={resizeMode}
      style={[
        customStyle,
        {
          width: w ?? 50,
          height: h ?? 50,
          // backgroundColor: 'red',
        },
      ]}
      {...Props}
    />
  );
};

export default AppImage;
