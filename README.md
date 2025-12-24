# Password Generator App 🔐

A simple and intuitive React Native password generator application that allows users to create secure passwords with customizable options.

## Features

- ✨ Generate passwords with customizable length (4-16 characters)
- 🔤 Include/exclude lowercase letters
- 🔠 Include/exclude uppercase letters
- 🔢 Include/exclude numbers
- 🔣 Include/exclude special symbols
- ✅ Form validation using Yup
- 📋 Easy password copying (long press to copy)
- 🎨 Clean and responsive UI

## Screenshots

<!-- Add your app screenshots here -->

## Technologies Used

- **React Native** - Mobile app framework
- **TypeScript** - Type-safe JavaScript
- **Formik** - Form management
- **Yup** - Schema validation
- **react-native-bouncy-checkbox** - Animated checkboxes
- **react-native-safe-area-context** - Safe area handling

## Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd password-generator
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the app:

For iOS:

```bash
npx react-native run-ios
```

For Android:

```bash
npx react-native run-android
```

## Usage

1. Enter the desired password length (between 4 and 16 characters)
2. Select the character types you want to include:
   - Lowercase letters (a-z)
   - Uppercase letters (A-Z)
   - Numbers (0-9)
   - Symbols (!@#$%^&\*()\_+)
3. Tap "Generate Password" to create your password
4. Long press on the generated password to copy it
5. Use "Reset" to clear and start over

## Code Structure

```
├── App.tsx                 # Main application component
├── styles                  # StyleSheet definitions
└── utils
    ├── GeneratePasswordString  # Password generation logic
    └── createPassword          # Character selection logic
```

## Key Components

- **Password Validation**: Ensures password length is between 4-16 characters
- **Character Selection**: Flexible options for different character types
- **Random Generation**: Secure random character selection
- **Responsive UI**: Works on various screen sizes

## Future Enhancements

- [ ] Password strength indicator
- [ ] Save password history
- [ ] Copy to clipboard with single tap
- [ ] Dark/Light theme toggle
- [ ] Password strength recommendations
- [ ] Export passwords securely

## Learning Outcomes

This project helped me learn:

- React Native form handling with Formik
- Form validation with Yup
- State management with useState
- TypeScript in React Native
- Custom styling and responsive design
- Third-party library integration

## Contributing

Feel free to fork this project and submit pull requests for any improvements.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Built as a self-learning project
- Inspired by the need for secure password generation

---

**Note**: This is a learning project and should not be used for generating passwords for critical security purposes without additional security measures.
