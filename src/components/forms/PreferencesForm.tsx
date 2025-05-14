'use client';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPreferences } from "../../redux/slices/onboardingSlice";
import { RootState } from "../../redux/store";
import { useForm } from "react-hook-form";

interface Props {
  next: () => void;
  prev: () => void;
}

interface PreferencesData {
  location: string;
  salary: string;
  startDate: string;
  comments: string;
}

const PreferencesForm = ({ next, prev }: Props) => {
  const dispatch = useDispatch();
  const existingData = useSelector((state: RootState) => state.onboarding.preferences);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PreferencesData>({
    defaultValues: existingData || {
      location: "",
      salary: "",
      startDate: "",
      comments: "",
    },
    mode: 'onChange',
  });

  // Function to validate start date is in the future
  const validateFutureDate = (value: string) => {
    const startDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to beginning of day for fair comparison

    return startDate >= today || "Start date must be today or in the future";
  };

  const onSubmit = (data: PreferencesData) => {
    dispatch(setPreferences(data));
    next();
  };

  const handlePrev = () => {
    prev();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card p-4 shadow-lg rounded" style={{
      maxWidth: "850px",
      background: "rgba(255, 255, 255, 0.3)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderRadius: "1.5rem",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
    }}>
      <div className="mb-3">
        <label><strong>Preferred Work Location</strong></label>
        <input
          className={`form-control ${errors.location ? 'is-invalid' : ''}`}
          {...register('location', { required: 'Work location is required' })}
        />
        {errors.location && <div className="invalid-feedback">{errors.location.message}</div>}
      </div>

      <div className="mb-3">
        <label><strong>Salary Expectations</strong></label>
        <input
          className={`form-control ${errors.salary ? 'is-invalid' : ''}`}
          {...register('salary', {
            required: 'Salary expectation is required',
            pattern: {
              value: /^[0-9]+$/,
              message: 'Please enter a valid amount without symbols'
            }
          })}
        />
        {errors.salary && <div className="invalid-feedback">{errors.salary.message}</div>}
      </div>

      <div className="mb-3">
        <label><strong>Available Start Date</strong></label>
        <input
          type="date"
          className={`form-control ${errors.startDate ? 'is-invalid' : ''}`}
          {...register('startDate', {
            required: 'Start date is required',
            validate: validateFutureDate
          })}
        />
        {errors.startDate && <div className="invalid-feedback">{errors.startDate.message}</div>}
      </div>

      <div className="mb-3">
        <label><strong>Additional Comments</strong></label>
        <textarea
          className="form-control"
          {...register('comments')}
        />
      </div>

      <div className="d-flex justify-content-between">
        <button type="button" className="btn btn-secondary" onClick={handlePrev}>
          Previous
        </button>
        <button type="submit" className="btn btn-primary" disabled={!isValid}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default PreferencesForm;
