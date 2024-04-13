import { Stack, Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, Pressable, Text, Touchable, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DoctorImage, MedicalImage, PaperImage } from '~/assets';


export default function Home()
{
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar hidden />
      <SafeAreaView>
        <View className=' flex flex-col items-center h-screen justify-evenly bg-white  '>
          <View>
            <Text className='  text-4xl font-bold  text-pink-400 '>Mero Doctor </Text>
            <Text className=' text-xl font-bold text-pink-300 '>Only Doctor You Need </Text>

          </View>
          <Image className='  size-96' source={DoctorImage} />

          <Link href={'/home/'} asChild>
            <Pressable className=' bg-white shadow-lg px-20  py-4 rounded-full'>
              <Text className=' text-pink-400 '>
                Continue
              </Text>
            </Pressable>
          </Link>

        </View>
      </SafeAreaView>
    </>
  );
}
