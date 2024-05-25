import CustomSuspense from "@/components/custom-suspense";
import Loading from "@/components/loading";
import { Card } from "@nextui-org/card";
import { useApi } from "@/hooks/useApi";
import attentionService from "@/services/attentionService";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import AttentionDetailFields from "@/components/attention/attention-detail-fields";
import { Button } from "@nextui-org/react";
import { Attention } from "@/types/attention";
import { useSession } from "next-auth/react";

const periodMap: Record<string, string> = {
  DAYS: "días",
  WEEKS: "semanas",
  MONTHS: "meses",
  YEARS: "años",
};

const periodUnitMap: Record<string, string> = {
  DAY: "día",
  WEEK: "semana",
  MONTH: "mes",
  YEAR: "año",
};
import jsPDF from "jspdf";
import { Download } from "lucide-react";
const AttentionDetail = () => {
  const [attention, setAttention] = useState<Attention>({} as Attention);
  const {
    response: getAllergyByIdPatientIdResponse,
    fetchData: getAttentionByIdPatientId,
  } = useApi();
  const [isEditing, setIsEditing] = useState(false);
  const { data: session } = useSession();

  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (params.attentionId && params.patientId) {
        await getAttentionByIdPatientId(
          attentionService.getAttentionByIdPatientId(
            params.attentionId as string,
            params.patientId as string
          )
        );
      }
    };

    fetchData();
  }, [params.attentionId, params.patientId]);

  useEffect(() => {
    if (getAllergyByIdPatientIdResponse.isSuccess) {
      setAttention(getAllergyByIdPatientIdResponse.data);
    }
  }, [getAllergyByIdPatientIdResponse.isSuccess]);

  const handleInputChange = (key: string, value: any) => {
    setAttention({ ...attention, [key]: value });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(10);
    const lineHeight = 7;
    let cursorY = 10;

    const addHeading = (text: any) => {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(text, 10, cursorY);
      cursorY += lineHeight;
      doc.setFontSize(10); 
      doc.setFont('helvetica', 'normal');
    };

    const addText = (text: any) => {
      const lines = doc.splitTextToSize(text, 180);
      for (const line of lines) {
        if (cursorY > 280) {
          doc.addPage();
          cursorY = 10; 
        }
        doc.text(line, 10, cursorY);
        cursorY += lineHeight;
      }
    };

    addHeading("Detalle de la atención médica");

    addText(`Paciente: ${session?.user?.name || ""}`);
    addText(`ID: ${session?.user?.id || ""}`);
    addText(`Tipo de atención: ${attention.typeOfAttention || ""}`);
    addText(`Fecha de registro: ${attention.recorded_date || ""}`);
    addHeading("Signos vitales");
    addText(`Peso: ${attention.vitalSigns?.weight || ""} KG`);
    addText(`Talla: ${attention.vitalSigns?.size || ""} cm`);
    addText(`IMC: ${attention.vitalSigns?.imc || ""}`);
    addText(`Temperatura: ${attention.vitalSigns?.temperature || ""} C°`);
    addText(
      `Frecuencia cardíaca: ${attention.vitalSigns?.heartRate || ""} lpm`
    );
    addText(
      `Frecuencia respiratoria: ${
        attention.vitalSigns?.respiratoryRate || ""
      } rpm`
    );
    addText(
      `Saturación de oxígeno: ${
        attention.vitalSigns?.oxygenSaturation || ""
      } SpO2%`
    );
    addText(
      `Presión arterial: ${
        attention.vitalSigns?.bloodPressure?.systolic || ""
      }/${attention.vitalSigns?.bloodPressure?.diastolic || ""} mmHg`
    );
    addHeading("Examen físico");
    addText(`Cabeza: ${attention.physicalExam?.head || ""}`);
    addText(`Ojos: ${attention.physicalExam?.eyes || ""}`);
    addText(`Nariz: ${attention.physicalExam?.nose || ""}`);
    addText(`Oídos: ${attention.physicalExam?.ears || ""}`);
    addText(`Garganta: ${attention.physicalExam?.throat || ""}`);
    addText(`Cuello: ${attention.physicalExam?.neck || ""}`);
    addText(`Tórax y pulmones: ${attention.physicalExam?.chestAndLungs || ""}`);
    addText(`Cardiovascular: ${attention.physicalExam?.cardiovascular || ""}`);
    addText(`Abdominal: ${attention.physicalExam?.abdominal || ""}`);
    addText(
      `Geriátrico y urinario: ${attention.physicalExam?.gereatricouniary || ""}`
    );
    addText(`Neurológico: ${attention.physicalExam?.neurological || ""}`);
    addText(`Extremidades: ${attention.physicalExam?.extremities || ""}`);
    addHeading("Consulta");
    addText(
      `Tiempo de enfermedad: ${attention.timeOfDisease?.units || ""} ${
        parseInt(attention.timeOfDisease?.period) > 1 ? periodMap[attention.timeOfDisease?.period] || "" : periodUnitMap[attention.timeOfDisease?.period] || ""
      }`
    );
    addText(`Motivo de la consulta: ${attention.reasonForConsultation || ""}`);
    addText(`Observaciones: ${attention.observations || ""}`);
    addHeading("Diagnóstico");

    attention.diagnoses?.forEach((diagnosis, index) => {
      addText(
        `Diagnóstico ${index + 1}: ${diagnosis.code} - ${
          diagnosis.description
        } - ${diagnosis.type}`
      );
    });

    addHeading("Tratamiento");

    attention.treatments?.forEach((treatment, index) => {
      addText(`Tratamiento ${index + 1}: ${treatment.description}`);
    });

    addHeading("Examenes auxiliares");

    attention.auxiliaryExams?.forEach((exam, index) => {
      addText(`Examen ${index + 1}: ${exam.description}`);
    });

    doc.save(`atencion-${attention.attention_id}-${session?.user.name}.pdf`);
  };

  return (
    <CustomSuspense
      isLoading={getAllergyByIdPatientIdResponse.isLoading}
      fallback={<Loading />}
    >
      <Card className='items-stretch self-stretch shadow flex flex-col my-2.5 p-5 rounded-2xl max-md:max-w-full'>
        {attention && (
          <>
            <Button color='primary' variant='bordered' className="mb-4" onClick={generatePDF} startContent={<Download />}>Descargar PDF</Button>
            <AttentionDetailFields
              attention={attention}
              isEditing={isEditing}
              handleInputChange={handleInputChange}
            />
          </>
        )}
      </Card>
    </CustomSuspense>
  );
};

export default AttentionDetail;
