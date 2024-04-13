import axios, { AxiosResponse } from 'axios';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Alert, ActivityIndicator } from 'react-native';

type FormState = {
    Pregnancies: number;
    Glucose: number;
    BloodPressure: number;
    SkinThickness: number;
    Insulin: number;
    BMI: number;
    DiabetesPedigreeFunction: number;
    Age: number;
};

const DiabetesForm: React.FC = () =>
{
    const [form, setForm] = useState<FormState>({
        Pregnancies: 0,
        Glucose: 0,
        BloodPressure: 0,
        SkinThickness: 0,
        Insulin: 0,
        BMI: 0,
        DiabetesPedigreeFunction: 0,
        Age: 0,
    });
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (field: keyof FormState, value: string) =>
    {
        setForm((prevForm) => ({
            ...prevForm,
            [field]:
                isNaN(parseFloat(value)) ? 0 : field.includes('Pregnancies') || field === 'Age'
                    ? parseInt(value)
                    : parseFloat(value),
        }));
    };

    const handleSubmit = async () =>
    {
        try
        {
            setIsLoading(true)
            console.log(form);
            const response: AxiosResponse = await axios.post('https://diabetes-api-1.onrender.com/predict', {
                ...form,
            });
            Alert.alert(response.data[0])
        } catch (error)
        {
            console.log(error);
        } finally
        {
            setIsLoading(false)
        }
    };

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <ScrollView className="px-6">
                <Text className="text-2xl text-center font-bold p-5 text-pink-400">Diabetes Prediction Form</Text>
                {Object.keys(form).map((field) => (
                    <View key={field} className="mb-6">
                        <Text className=" text-pink-400/70 capitalize">{field}</Text>
                        <View className="flex flex-row items-center ">
                            <TextInput
                                className="bg-white py-2 rounded-xl  pl-2 w-[75%] "
                                keyboardType="numeric"
                                value={form[field as keyof FormState].toString()}
                                onChangeText={(text) => handleChange(field as keyof FormState, text)}
                            />
                            <Text className="text-pink-400/70 ml-2">
                                {field === 'Pregnancies'
                                    ? 'no'
                                    : field === 'Glucose'
                                        ? 'mg/dL'
                                        : field === 'BloodPressure'
                                            ? 'mmHg'
                                            : field === 'SkinThickness'
                                                ? 'mm'
                                                : field === 'Age'
                                                    ? 'years'
                                                    : field === 'BMI'
                                                        ? 'kg/m²'
                                                        : field === 'DiabetesPedigreeFunction'
                                                            ? '0.08 - 2.42'
                                                            : field === 'Insulin'
                                                                ? 'μU/mL'
                                                                : ''}
                            </Text>
                        </View>
                    </View>
                ))}
                <Pressable disabled={isLoading} onPress={handleSubmit} className="bg-white flex items-center py-4 rounded-full">
                    {isLoading ? <ActivityIndicator color={"pink"} /> : <Text className=" text-pink-400 ">Predict</Text>}
                </Pressable>
            </ScrollView>
        </>
    );
};

export default DiabetesForm;