import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { useRouter } from "next/router";
import { resetOnboarding } from "../../redux/slices/onboardingSlice";

const SummaryPage = () => {
  const {
    personalInfo,
    contactDetails,
    education,
    workExperience,
    preferences,
  } = useSelector((state: RootState) => state.onboarding);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleReset = () => {
    dispatch(resetOnboarding());
    router.push("/");
  };

  return (
    <div
      className="min-vh-100 py-5"
      style={{
        background: "linear-gradient(to right, #1a1a1a, #333333)",
        padding: "2rem",
      }}
    >
      <div className="container" style={{ maxWidth: 850 }}>
        <div className="bg-dark text-white shadow-lg rounded-4 p-4">
          <div
            className="text-center mb-5"
            style={{
              borderBottom: "3px solid #007bff",
              paddingBottom: "1rem",
            }}
          >
            <h2 className="text-primary fw-bold">🎉 Onboarding Summary</h2>
          </div>

          {/* Sections */}
          {[
            {
              title: "👤 Personal Information",
              items: [
                ["Full Name", personalInfo.fullName],
                ["Date of Birth", personalInfo.dob],
                ["Gender", personalInfo.gender],
                ["Nationality", personalInfo.nationality],
              ],
            },
            {
              title: "📞 Contact Details",
              items: [
                ["Email", contactDetails.email],
                ["Phone", contactDetails.phone],
                ["Address", contactDetails.address],
                ["Preferred Contact Method", contactDetails.contactMethod],
              ],
            },
            {
              title: "🎓 Education",
              items: [
                ["Level", education.level],
                ["Field", education.field],
                ["Institution", education.institution],
                ["Year of Completion", education.year],
              ],
            },
            {
              title: "💼 Work Experience",
              items: [
                ["Employment Status", workExperience.employmentStatus],
                ["Years of Experience", workExperience.experienceYears],
              ],
            },
            {
              title: "🎯 Preferences",
              items: [
                ["Preferred Location", preferences.location],
                ["Salary Expectation", preferences.salary],
                ["Start Date", preferences.startDate],
                ["Additional Comments", preferences.comments],
              ],
            },
          ].map((section, idx) => (
            <div key={idx} className="mb-4">
              <h4 className="text-secondary border-bottom pb-2 mb-3">
                {section.title}
              </h4>
              <div className="row">
                {section.items.map(([label, value], index) => (
                  <div className="col-sm-6 mb-2" key={index}>
                    <strong>{label}:</strong>{" "}
                    {value || <em className="text-muted">N/A</em>}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Start Again Button */}
          <div className="text-center mt-4">
            <button
              className="btn btn-lg btn-primary rounded-pill px-4"
              onClick={handleReset}
            >
              🔄 Start New Onboarding
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;
