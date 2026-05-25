import LeadForm from './LeadForm.jsx';
import SectionHeading from './SectionHeading.jsx';

export default function Registration({ content }) {
  const { registrationSection } = content;

  return (
    <section className="section-shell content-section registration-section" id="register">
      <SectionHeading
        eyebrow={registrationSection.eyebrow}
        title={registrationSection.title}
        text={registrationSection.text}
      />
      <div className="registration-grid">
        <div className="crm-panel">
          <div className="crm-panel-header">
            <span>{registrationSection.pipelineLabel}</span>
            <strong>{registrationSection.pipelineTitle}</strong>
          </div>
          <div className="crm-steps">
            {registrationSection.steps.map((step, index) => (
              <div className="crm-step" key={step.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <LeadForm content={content} source="registration-section" />
      </div>
    </section>
  );
}
