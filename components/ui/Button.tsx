import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const Button = ({ children }: { children: React.ReactNode }): React.ReactNode =>
{
    return (
        <TouchableOpacity className=' bg-white px-20  py-4 rounded-full'>
            <Text className=' text-pink-400 '>
                {children}
            </Text>
        </TouchableOpacity>
    )
}

export default Button