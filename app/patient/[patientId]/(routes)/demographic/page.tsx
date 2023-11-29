import PatientDemographicBasicInfo from './components/demographic-basic-info';
import PatientDemographicForm from './components/demographic-form';

export default function DemographicPage() {
  return (
    <div className="flex flex-col  items-center gap-5 px-4 py-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-32">
      <PatientDemographicBasicInfo />
      <PatientDemographicForm />
    </div>
  );
}
