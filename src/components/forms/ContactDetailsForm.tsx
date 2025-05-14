'use client';
import { useDispatch, useSelector } from "react-redux";
import { setContactDetails } from "../../redux/slices/onboardingSlice";
import { RootState } from "../../redux/store";
import { useForm } from "react-hook-form";

interface Props {
  next: () => void;
  prev: () => void;
}

interface ContactDetails {
  email: string;
  phone: string;
  address: string;
  contactMethod: string;
}

const ContactDetailsForm = ({ next, prev }: Props) => {
  const dispatch = useDispatch();

  const contact = useSelector(
    (state: RootState) => state.onboarding.contactDetails
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ContactDetails>({
    defaultValues: contact || {
      email: "",
      phone: "",
      address: "",
      contactMethod: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: ContactDetails) => {
    dispatch(setContactDetails(data));
    next();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="card p-4 shadow-lg rounded"
      style={{
        background: "rgba(255, 255, 255, 0.3)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: "1.5rem",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div className="mb-3">
        <label><strong>Email</strong></label>
        <input
          type="email"
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && (
          <div className="invalid-feedback">{errors.email.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label><strong>Phone</strong></label>
        <input
          className={`form-control ${errors.phone ? "is-invalid" : ""}`}
          {...register("phone", {
            required: "Phone is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Phone number must be 10 digits",
            },
          })}
        />
        {errors.phone && (
          <div className="invalid-feedback">{errors.phone.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label><strong>Address</strong></label>
        <textarea
          className={`form-control ${errors.address ? "is-invalid" : ""}`}
          {...register("address", {
            required: "Address is required",
            minLength: {
              value: 10,
              message: "Address must be at least 10 characters",
            },
          })}
        />
        {errors.address && (
          <div className="invalid-feedback">{errors.address.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label><strong>Preferred Contact Method</strong></label>
        <select
          className={`form-control ${errors.contactMethod ? "is-invalid" : ""}`}
          {...register("contactMethod", {
            required: "Preferred method is required",
          })}
        >
          <option value="">Select</option>
          <option value="Email">Email</option>
          <option value="Phone">Phone</option>
          <option value="SMS">SMS</option>
        </select>
        {errors.contactMethod && (
          <div className="invalid-feedback">{errors.contactMethod.message}</div>
        )}
      </div>

      <div className="d-flex justify-content-between">
        <button type="button" className="btn btn-secondary" onClick={prev}>
          Previous
        </button>
        <button type="submit" className="btn btn-primary" disabled={!isValid}>
          Next
        </button>
      </div>
    </form>
  );
};

export default ContactDetailsForm;
