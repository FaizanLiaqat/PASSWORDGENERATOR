import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should be min of 4 characters')
    .max(16, 'Should be max  of 16 characters')
    .required('Length is required'),
});

export default function App() {
  const [password, setPassword] = useState('');
  const [isPassGenerated, setisPassGenerated] = useState(false);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const GeneratePasswordString = (passwordLength: number) => {
    let characterList = '';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&*()_+';

    if (upperCase) {
      characterList += upperCaseChars;
    }
    if (lowerCase) {
      characterList += lowerCaseChars;
    }
    if (numbers) {
      characterList += digitChars;
    }
    if (symbols) {
      characterList += specialChars;
    }

    const passwordResult = createPassword(characterList, passwordLength);
    setPassword(passwordResult);
    setisPassGenerated(true);
  };

  const createPassword = (characters: string, passwordLength: number) => {
    //
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };

  const resetPasswordState = () => {
    setPassword('');
    setisPassGenerated(false);
    setLowerCase(true);
    setUpperCase(false);
    setNumbers(false);
    setSymbols(false);
  };

  return (
    <SafeAreaProvider>
      <ScrollView keyboardShouldPersistTaps="handled">
        <SafeAreaView style={styles.appContainer}>
          <View style={styles.formContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Password Generator</Text>
            </View>
            <Formik
              initialValues={{ passwordLength: '' }}
              validationSchema={PasswordSchema}
              onSubmit={values => {
                console.log(values);
                GeneratePasswordString(+values.passwordLength); // TODO
              }}
            >
              {({
                values,
                errors,
                touched,
                isValid,
                handleChange,
                handleSubmit,
                handleReset,
              }) => (
                <>
                  <View style={styles.inputWrapper}>
                    <View style={styles.inputColumn}>
                      <Text style={styles.heading}>Password Length</Text>
                      {touched.passwordLength && errors.passwordLength && (
                        <Text style={styles.errorText}>
                          {errors.passwordLength}
                        </Text>
                      )}
                    </View>
                    <TextInput
                      style={styles.inputStyle}
                      value={values.passwordLength}
                      onChangeText={handleChange('passwordLength')}
                      placeholder="Ex. 8"
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.heading}>Include Lowercase</Text>
                    <BouncyCheckbox
                      useBuiltInState={false}
                      isChecked={lowerCase}
                      onPress={() => setLowerCase(!lowerCase)}
                      fillColor="#2ecc71"
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.heading}>Include Uppercase </Text>
                    <BouncyCheckbox
                      useBuiltInState={false}
                      isChecked={upperCase}
                      onPress={() => setUpperCase(!upperCase)}
                      fillColor="#f1c40f"
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.heading}>Include Numbers</Text>
                    <BouncyCheckbox
                      useBuiltInState={false}
                      isChecked={numbers}
                      onPress={() => setNumbers(!numbers)}
                      fillColor="#3498db"
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.heading}>Include Symbols</Text>
                    <BouncyCheckbox
                      useBuiltInState={false}
                      isChecked={symbols}
                      onPress={() => setSymbols(!symbols)}
                      fillColor="#d35400"
                    />
                  </View>

                  <View style={styles.formActions}>
                    <TouchableOpacity
                      disabled={!isValid}
                      style={styles.primaryBtn}
                      onPress={handleSubmit}
                    >
                      <Text style={styles.primaryBtnTxt}>
                        Generate Password
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.secondaryBtn}
                      onPress={() => {
                        handleReset();
                        resetPasswordState();
                      }}
                    >
                      <Text style={styles.secondaryBtnTxt}>Reset</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </Formik>
          </View>
          {isPassGenerated ? (
            <View style={[styles.card, styles.cardElevated]}>
              <Text style={styles.subTitle}>Result:</Text>
              <Text style={styles.description}>Long Press to copy</Text>
              <View style={styles.resultContainer}>
                <Text selectable={true} style={styles.generatedPassword}>
                  {password}
                </Text>
              </View>
            </View>
          ) : null}
        </SafeAreaView>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#ffffffff',
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 35,
    marginVertical: 18,
    fontWeight: '900',
    color: '#000000ff',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  inputColumn: {
    flex: 1,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 16,
  },
  errorText: {
    color: '#f20000ff',
  },
  inputStyle: {
    borderWidth: 1,
    borderRadius: 10,
    width: 100,
    borderColor: '#000',
  },
  formActions: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 26,
  },
  primaryBtn: {
    height: 70,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#0097e6',
    marginRight: 8,
  },
  primaryBtnTxt: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  secondaryBtn: {
    height: 70,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#dcdde1',
    marginLeft: 8,
  },
  secondaryBtnTxt: {
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    height: 170,
    borderRadius: 10,
    marginVertical: 12,
    marginHorizontal: 16,
    paddingHorizontal: 16,
  },
  cardElevated: {
    backgroundColor: '#353b48',
    elevation: 10,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#000000ff',
  },
  subTitle: {
    paddingTop: 8,
    color: '#fff',
    fontSize: 28,
  },
  description: {
    color: '#fff',
    fontSize: 20,
    padding: 16,
  },
  resultContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#718093',
    borderRadius: 10,
    marginBottom: 16,
  },
  generatedPassword: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '900',
  },
});
