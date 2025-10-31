import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';

import { db } from '@/classes';
import { FormErrorText } from '@/components';
import { HorizontalDivider, Loading, PasswordValidator } from '@/components';
import { passwordValidationRules } from '@/constants/global';
import { useLanguageContext } from '@/context/LanguageContext';
import { useUserContext } from '@/context/UserContext';
import { emailRegEx, nameRegEx } from '@/utils/regEx';

interface IFormInputs {
  password: string;
  email: string;
  genderMale: boolean;
  firstName: string;
  lastName: string;
}

const SignUp = () => {
  const { t } = useLanguageContext();
  const { checkAuth } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, control } = useForm<IFormInputs>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      genderMale: undefined,
      firstName: '',
      lastName: '',
    },
  });
  const password = useWatch({ control, name: 'password' });

  const onSubmit: SubmitHandler<IFormInputs> = async (userInput) => {
    const { firstName, lastName } = userInput;
    setIsLoading(true);
    // validate no Jesus or Christ allowed for first and last name
    const { error } = await db.signUp({
      ...userInput,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
    });
    setIsLoading(false);
    if (error) {
      toast.error(error.message);
      console.error(error);
    } else {
      checkAuth();
    }
  };

  if (isLoading) return <Loading />;

  return (
    <FormControl
      fullWidth
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ gap: 1.5 }}
    >
      <HorizontalDivider />
      <Controller
        name="firstName"
        control={control}
        rules={{
          required: true,
          pattern: {
            value: nameRegEx,
            message: t.errorInvalidFirstName,
          },
          minLength: {
            value: 1,
            message: t.errorFirstNameIsTooShort,
          },
          maxLength: {
            value: 100,
            message: t.errorLastNameIsTooLong,
          },
        }}
        render={({ field }) => (
          <TextField
            label={t.firstName}
            fullWidth
            placeholder={t.firstName}
            {...field}
          />
        )}
      />
      <FormErrorText
        fieldName="First Name"
        name="firstName"
        control={control}
      />
      <Controller
        name="lastName"
        control={control}
        rules={{
          required: true,
          pattern: {
            value: nameRegEx,
            message: t.errorInvalidLastName,
          },
          minLength: {
            value: 1,
            message: t.errorLastNameIsTooShort,
          },
          maxLength: {
            value: 100,
            message: t.errorLastNameIsTooLong,
          },
        }}
        render={({ field }) => (
          <TextField
            label={t.lastName}
            fullWidth
            placeholder={t.lastName}
            {...field}
          />
        )}
      />
      <FormErrorText fieldName="Last name" name="lastName" control={control} />
      <Controller
        name="email"
        control={control}
        rules={{
          required: true,
          pattern: {
            value: emailRegEx,
            message: t.errorInvalidEmail,
          },
          maxLength: {
            value: 100,
            message: t.errorEmailIsTooLong,
          },
        }}
        render={({ field }) => (
          <TextField
            label={t.email}
            fullWidth
            placeholder={t.email}
            {...field}
          />
        )}
      />
      <FormErrorText control={control} name="email" />
      <Controller
        name="password"
        control={control}
        rules={passwordValidationRules}
        render={({ field }) => (
          <TextField
            label={t.password}
            fullWidth
            type="password"
            placeholder={t.password}
            {...field}
          />
        )}
      />
      <FormErrorText name="password" control={control} />
      <PasswordValidator password={password} />
      <Box my={1}>
        <FormLabel id="gender">{t.selectGender}:</FormLabel>
        <Controller
          name="genderMale"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <RadioGroup
              id="gender"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}
              defaultValue={t.male}
              {...field}
            >
              <FormControlLabel
                value={true}
                control={<Radio />}
                label={t.male}
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label={t.female}
              />
            </RadioGroup>
          )}
        />
        <FormErrorText name="genderMale" fieldName="gender" control={control} />
        <Button
          sx={{ marginTop: '1em' }}
          disabled={isLoading}
          fullWidth
          type="submit"
          variant="contained"
        >
          {isLoading ? t.loading : t.signUp}
        </Button>
      </Box>
    </FormControl>
  );
};

export default SignUp;
