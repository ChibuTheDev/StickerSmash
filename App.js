import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library'
import ImageViewer from './components/ImageViewer';
import Button from './components/Button';
import { useRef, useState } from 'react';
import CircleButton from './components/CircleButton';
import IconButton from './components/IconButton';
import EmojiPicker from './components/EmojiPicker';
import EmojiList from './components/EmojiList';
import EmojiSticker from './components/EmojiSticker';
import { captureRef } from 'react-native-view-shot'
import * as SplashScreen from 'expo-splash-screen';
 
const PlaceholderImage = require('./assets/images/background-image.png')

export default function App() {

      const [selectedImage,setSelectedImage] = useState(null);
      const [showAppOptions, setShowAppOptions] = useState(false);
      const [isModalVisible, setIsModalVisible] = useState(false);
      const imageRef = useRef()
      const [pickedEmoji,setPickedEmoji] = useState(null)

      SplashScreen.preventAutoHideAsync();
      setTimeout(SplashScreen.hideAsync, 3000);

      if (status === null) {
        requestPermission();
      }
    

      const [status, requestPermission] = MediaLibrary.usePermissions()
      const pickImage = async () =>{
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          quality: 1,
        })
      
   
  if(!result.canceled) {
     setSelectedImage(result.assets[0].uri);
     setShowAppOptions(true)
  } else{
          alert('Gegerege')
  }

      }

      const onReset = () => {
        setShowAppOptions(false);
      };
    
      const onAddSticker = () => {
        setIsModalVisible(true)
      };

      const onModalClose = () => {
        setIsModalVisible(false)
      }
    
      const onSaveImageAsync = async () => {
        /*
         I captured a screenshot of the view by calling the captureRef() method 
         from react-native-view-shot inside the 
         onSaveImageAsync() function. captureRef()
          accepts an optional argument where I can 
          pass the width and height of the area I'd like to capture a screenshot for.

        The captureRef() method returns a
         promise that fulfills with the URI
          of the captured screenshot. We will 
          pass this URI as a parameter to 
          MediaLibrary.saveToLibraryAsync(),
           which will save the screenshot to the
            device's media library.
        */
        try {
          const localUri = await captureRef(imageRef, {
            height: 440,
            quality: 1,
          });
    
          await MediaLibrary.saveToLibraryAsync(localUri);
          if (localUri) {
            alert("Saved!");
          }
        } catch (e) {
          console.log(e);
        }
      };

  return (
    <GestureHandlerRootView style={styles.container}>

<View style={styles.imageContainer}>
    <View ref={imageRef} collapsable={false}>
      <ImageViewer PlaceholderImageSource={PlaceholderImage} selectedImage={selectedImage}/>
      {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
    </View>
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button theme="primary" label="Choose a photo" onPress={pickImage} />
          <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
        </View>
      )}
          <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
              <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose}/>
          </EmojiPicker>
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },

   imageContainer:{
    flex:1,
    paddingTop:58,
   },
   footerContainer:{
    flex: 1 / 3,
    alignItems: 'center',
   },
   optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  }
});


























{/*   <View style={styles.imageContainer}>
      <ImageViewer PlaceholderImageSource={PlaceholderImage} selectedImage={selectedImage}/>
      </View>
      <View style={styles.footerContainer}>
       <Button  theme='primary' label='Choose a Photo' onPress={pickImage}/>
       <Button label='Use this photo' onPress={()=>setShowAppOptions(true)} />
       </View> */}




          {/* {showAppOptions ? (
        <View />
      ) : (
        <View style={styles.footerContainer}>
          <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
          <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
        </View>
      )} */}