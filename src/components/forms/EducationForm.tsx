'use client';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEducation } from "../../redux/slices/onboardingSlice";
import { RootState } from "../../redux/store";
import { useForm } from "react-hook-form";

interface Props {
  next: () => void;
  prev: () => void;
}

interface EducationData {
  level: string;
  field: string;
  institution: string;
  year: string;
}

const EducationForm = ({ next, prev }: Props) => {
  const dispatch = useDispatch();
  const existingData = useSelector((state: RootState) => state.onboarding.education);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EducationData>({
    defaultValues: existingData || {
      level: "",
      field: "",
      institution: "",
      year: "",
    },
    mode: 'onChange',
  });

  const onSubmit = (data: EducationData) => {
    dispatch(setEducation(data));
    next();
  };

  const handlePrev = () => {
    prev();
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
      <div className="mb-3">
        <label><strong>Highest Level of Education</strong></label>
        <select
          className={`form-control ${errors.level ? 'is-invalid' : ''}`}
          {...register('level', { required: 'Education level is required' })}
        >
          <option value="">Select</option>
          <option>High School</option>
          <option>Bachelor's</option>
          <option>Master's</option>
          <option>PhD</option>
          <option>Other</option>
        </select>
        {errors.level && <div className="invalid-feedback">{errors.level.message}</div>}
      </div>

      <div className="mb-3">
        <label><strong>Field of Study</strong></label>
        <input
          className={`form-control ${errors.field ? 'is-invalid' : ''}`}
          {...register('field', { required: 'Field of study is required' })}
        />
        {errors.field && <div className="invalid-feedback">{errors.field.message}</div>}
      </div>

      <div className="mb-3">
        <label><strong>Institution Name</strong></label>
        <input
          className={`form-control ${errors.institution ? 'is-invalid' : ''}`}
          {...register('institution', { required: 'Institution name is required' })}
        />
        {errors.institution && <div className="invalid-feedback">{errors.institution.message}</div>}
      </div>

      <div className="mb-3">
        <label><strong>Year of Completion</strong></label>
        <input
          className={`form-control ${errors.year ? 'is-invalid' : ''}`}
          {...register('year', {
            required: 'Year of completion is required',
            pattern: {
              value: /^(19|20)\d{2}$/,
              message: 'Year must be between 1900 and 2099'
            }
          })}
        />
        {errors.year && <div className="invalid-feedback">{errors.year.message}</div>}
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

export default EducationForm;