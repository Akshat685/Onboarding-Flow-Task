'use client';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWorkExperience } from "../../redux/slices/onboardingSlice";
import { RootState } from "../../redux/store";
import { useForm } from "react-hook-form";

interface Props {
  next: () => void;
  prev: () => void;
}

interface WorkExperienceData {
  employmentStatus: string;
  experienceYears: string;
}

const WorkExperienceForm = ({ next, prev }: Props) => {
  const dispatch = useDispatch();
  const existingData = useSelector((state: RootState) => state.onboarding.workExperience);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<WorkExperienceData>({
    defaultValues: existingData || {
      employmentStatus: "",
      experienceYears: "",
    },
    mode: 'onChange',
  });

  const onSubmit = (data: WorkExperienceData) => {
    dispatch(setWorkExperience(data));
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
        <label><strong>Current Employment Status</strong></label>
        <select
          className={`form-control ${errors.employmentStatus ? 'is-invalid' : ''}`}
          {...register('employmentStatus', { required: 'Employment status is required' })}
        >
          <option value="">Select</option>
          <option>Employed</option>
          <option>Unemployed</option>
          <option>Student</option>
          <option>Freelancer</option>
        </select>
        {errors.employmentStatus && <div className="invalid-feedback">{errors.employmentStatus.message}</div>}
      </div>

      <div className="mb-3">
        <label><strong>Years of Experience</strong></label>
        <input
          type="number"
          className={`form-control ${errors.experienceYears ? 'is-invalid' : ''}`}
          {...register('experienceYears', { 
            required: 'Years of experience is required',
            min: {
              value: 0,
              message: 'Years of experience cannot be negative'
            },
            pattern: {
              value: /^[0-9]+$/,
              message: 'Please enter a valid integer'
            }
          })}
        />
        {errors.experienceYears && <div className="invalid-feedback">{errors.experienceYears.message}</div>}
      </div>

      <div className="d-flex justify-content-between">
        <button type="button" className="btn btn-secondary" onClick={handlePrev}>
          Previous
        </button>
        <button type="submit" className="btn btn-primary" disabled={!isValid}>
          Next
        </button>
      </div>
    </form>
  );
};

export default WorkExperienceForm;