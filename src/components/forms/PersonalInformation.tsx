'use client';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setPersonalInfo } from '../../redux/slices/onboardingSlice';
import { RootState } from '../../redux/store'; // Adjust the path as needed

interface PersonalInfo {
  fullName: string;
  dob: string;
  gender: string;
  nationality: string;
}

interface Props {
  next: () => void;

}

const PersonalInfoForm = ({ next }: Props) => {
  const dispatch = useDispatch();
  const existingData = useSelector((state: RootState) => state.onboarding.personalInfo);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<PersonalInfo>({
    defaultValues: existingData || {
      fullName: '',
      dob: '',
      gender: '',
      nationality: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: PersonalInfo) => {
    dispatch(setPersonalInfo(data));
    next();
  };

  // Function to validate age (must be at least 18 years old)
  const validateAge = (value: string) => {
    const birthDate = new Date(value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age >= 18 || "Must be at least 18 years old";
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card p-4 shadow-lg rounded"
      style={{
        maxWidth: "850px",
        background: "rgba(255, 255, 255, 0.3)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: "1.5rem",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
      }}>
      <div className="mb-3" >
        <label htmlFor="fullName" className="form-label"><strong>Full Name</strong></label>
        <input
          id="fullName"
            // name="fullName"
          className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
          {...register('fullName', {
            required: 'Full name is required',
            minLength: {
              value: 6,
              message: 'Name must be at least 6 characters'
            }
          })}
        />
        {errors.fullName && (
          <div className="invalid-feedback">{errors.fullName.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="dob" className="form-label"><strong>Date of Birth</strong></label>
        <input
          id="dob"
          type="date"
          className={`form-control ${errors.dob ? 'is-invalid' : ''}`}
          {...register('dob', {
            required: 'Date of birth is required',
            validate: validateAge
          })}
        />
        {errors.dob && (
          <div className="invalid-feedback">{errors.dob.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="gender" className="form-label"><strong>Gender</strong></label>
        <select
          id="gender"
          //   name="gender"
          className={`form-control ${errors.gender ? 'is-invalid' : ''}`}
          {...register('gender', {
            required: 'Please select a gender',
          })}
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </select>
        {errors.gender && (
          <div className="invalid-feedback">{errors.gender.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="nationality" className="form-label"><strong>Nationality</strong></label>
        <input
          id="nationality"
          //   name="nationality"
          className={`form-control ${errors.nationality ? 'is-invalid' : ''}`}
          {...register('nationality', {
            required: 'Nationality is required',
          })}
        />
        {errors.nationality && (
          <div className="invalid-feedback">{errors.nationality.message}</div>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={!isValid}
      >
        Next
      </button>
    </form>
  );
};

export default PersonalInfoForm;