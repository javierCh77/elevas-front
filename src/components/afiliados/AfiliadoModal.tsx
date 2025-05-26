// ✅ AfiliadoModal.tsx con captura desde cámara o carga manual mejorada visualmente
"use client";

import { Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AfiliadoInput, Afiliado } from "@/types/afiliado";
import { Empresa } from "@/types/empresa";
import api from "@/lib/api";
import Image from "next/image";
import toast from "react-hot-toast";

interface AfiliadoModalProps {
  open: boolean;
  isEditing: boolean;
  afiliado?: AfiliadoInput;
  onClose: () => void;
  onSave: (data: FormData) => void;
}

const FORM_DEFAULT: AfiliadoInput = {
  nombre: "",
  apellido: "",
  sexo: "F",
  esTitular: true,
  numeroAfiliado: "",
  dni: "",
  cuil: "",
  fechaNacimiento: "",
  direccion: "",
  piso: "",
  departamento: "",
  telefono: "",
  email: "",
  estado: "",
  observaciones: "",
  empresaId: "sin_empresa",
  situacionLaboral: "desempleado",
  fechaAltaEmpresa: "",
  planta: "sin_planta",
  situacionAfiliado: "activo",
  diabetico: false,
  planMaterno: false,
  certificadoDiscapacidad: false,
  titularId: undefined,
  relacionConTitular: undefined,
   fotoUrl:""
};

export default function AfiliadoModal({ open, isEditing, afiliado, onClose, onSave,}: AfiliadoModalProps) {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [titulares, setTitulares] = useState<Afiliado[]>([]);
  const [errores, setErrores] = useState< Partial<Record<keyof AfiliadoInput, string>>>({});
  const nombreInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<AfiliadoInput>(FORM_DEFAULT);
  const [foto, setFoto] = useState<File | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showCamera, setShowCamera] = useState(false);


  

  useEffect(() => {
    if (open) {
      if (isEditing && afiliado) {
        setFormData(afiliado);
      } else {
        setFormData(FORM_DEFAULT);
      }
      setErrores({});
      setFoto(null);
      stopCamera();
      setTimeout(() => {
        nombreInputRef.current?.focus();
      }, 100);
    }
  }, [open, isEditing, afiliado]);

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const res = await api.get("/empresas");
        setEmpresas(res.data);
      } catch (error) {
        console.error("Error al cargar empresas", error);
      }
    };
    const fetchTitulares = async () => {
      try {
        const res = await api.get("/afiliados?esTitular=true");
        setTitulares(res.data);
      } catch (error) {
        console.error("Error al cargar titulares", error);
      }
    };
    fetchEmpresas();
    fetchTitulares();
  }, []);

  const startCamera = async () => {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (error) {
      console.error("No se pudo acceder a la cámara:", error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject instanceof MediaStream) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
    setShowCamera(false);
  };

  const capturarFoto = () => {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob) {
          const archivo = new File([blob], "foto.jpg", { type: "image/jpeg" });
          setFoto(archivo);
        }
        stopCamera();
      }, "image/jpeg");
    }
  };

  const handleArchivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0];
    if (archivo) {
      setFoto(archivo);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" && e.target instanceof HTMLInputElement
        ? e.target.checked
        : undefined;

    const key = name as keyof AfiliadoInput; // 👈 Tipo seguro

    setFormData((prev) => ({
      ...prev,
      [key]:
        (key === "empresaId" && value === "sin_empresa") ||
        (key === "planta" && value === "sin planta")
          ? undefined
          : type === "checkbox"
          ? checked
          : value || undefined,
    }));
  };

const handleSubmit = () => {
  const nuevosErrores: Partial<Record<keyof AfiliadoInput, string>> = {};

  // Validación de campos requeridos
  Object.entries(formData).forEach(([key, value]) => {
    if (
      typeof value === "string" &&
      !value.trim() &&
      ![
        "fechaAltaEmpresa",
        "planta",
        "planMaterno",
        "empresaId",
        "titularId",
        "relacionConTitular",
        "piso",
        "departamento",
        "observaciones",
        "fotoUrl"
      ].includes(key)
    ) {
      nuevosErrores[key as keyof AfiliadoInput] = "Campo obligatorio";
    }
  });

  if (Object.keys(nuevosErrores).length > 0) {
    setErrores(nuevosErrores);
    toast.error("Revisá los campos obligatorios.");
    return;
  }

  const data = new FormData();
  const booleanFields = ["diabetico", "planMaterno", "certificadoDiscapacidad", "esTitular"];

  Object.entries(formData).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== "" &&
      value !== "undefined"
    ) {
      if (booleanFields.includes(key)) {
        data.append(key, value === true ? "true" : "false");
      } else {
        data.append(key, String(value));
      }
    }
  });

  if (foto) data.append("foto", foto);

  // 🔍 Debug log (opcional)
  console.log("📤 Enviando FormData:");
  for (const [k, v] of data.entries()) {
    console.log(`${k}:`, v);
  }

  onSave(data);
};









  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-6xl max-h-[80vh] overflow-y-auto">
        <div className="flex gap-2 items-center mb-4">
          <Users />
          <h2 className="text-lg font-semibold">
            {isEditing ? "Editar Afiliado" : "Nuevo Afiliado"}
          </h2>
        </div>

        {/* Foto del afiliado */}
        <div className="mb-6 bg-gray-50 p-4 rounded-lg border">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            📷 Foto del afiliado{" "}
            <span className="text-gray-500 font-normal">(opcional)</span>
          </label>

          {!foto && !showCamera && (
            <div className="flex flex-wrap gap-4 items-center">
              <button
                onClick={startCamera}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
              >
                Usar cámara
              </button>
              <label className="text-sm text-blue-700 underline cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleArchivo}
                  className="hidden"
                />
                o cargar desde archivo
              </label>
            </div>
          )}

          {showCamera && (
            <div className="mt-4">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-64 h-64 object-cover border rounded"
              />
              <div className="mt-2 flex gap-2">
                <button
                  onClick={capturarFoto}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded cursor-pointer"
                >
                  ✅ Capturar
                </button>
                <button
                  onClick={stopCamera}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded cursor-pointer"
                >
                  ❌ Cancelar
                </button>
              </div>
            </div>
          )}

          {foto && (
            <div className="mt-4 flex flex-col items-start">
              <Image
                src={URL.createObjectURL(foto)}
                alt="Previsualización"
                className="w-32 h-32 object-cover border rounded"
                width={100}
                height={100}
              />
              <button
                onClick={() => setFoto(null)}
                className="mt-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-3 py-1 rounded text-sm"
              >
                🔄 Reintentar / Eliminar foto
              </button>
            </div>
          )}
        </div>

        {/* ✅ Es Titular + Relación */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2 mb-6">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              ¿Es titular?
            </label>
            <input
              type="checkbox"
              name="esTitular"
              checked={formData.esTitular}
              onChange={handleChange}
              className="mt-2 w-4 h-4"
            />
          </div>

          {!formData.esTitular && (
            <>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Titular
                </label>
                <select
                  name="titularId"
                  value={formData.titularId ?? ""}
                  onChange={handleChange}
                  className="border p-2 rounded bg-white"
                >
                  <option value="">Seleccionar titular</option>
                  {titulares
                    .filter((t) => t.esTitular) // 💡 asegura que solo los titulares reales aparezcan
                    .map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.nombre} {t.apellido} - DNI {t.dni}
                      </option>
                    ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Relación con el titular
                </label>
                <select
                  name="relacionConTitular"
                  value={formData.relacionConTitular ?? ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      relacionConTitular: e.target.value as any,
                    })
                  }
                  className="border p-2 rounded bg-white"
                >
                  <option value="">Seleccionar relación</option>
                  <option value="hijo/a">Hijo/a</option>
                  <option value="conyuge">Cónyuge</option>
                  <option value="persona a cargo">Persona a cargo</option>
                </select>
              </div>
            </>
          )}
        </div>
        {/* 🧍 Datos Personales */}
        <h3 className="col-span-3 text-md font-bold text-gray-600 mt-4">
          Datos personales
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          {[
            "nombre",
            "apellido",
            "dni",
            "cuil",
            "numeroAfiliado",
            "fechaNacimiento",
            "direccion",
            "piso",
            "departamento",
            "telefono",
            "email",
            "observaciones",
          ].map((campo) => (
            <div key={campo} className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 capitalize">
                {campo.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                id={campo}
                name={campo}
                type={
                  campo.includes("fecha")
                    ? "date"
                    : campo.includes("email")
                    ? "email"
                    : "text"
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                value={(formData as any)[campo] ?? ""}
                
                onChange={handleChange}
                className={`border p-2 rounded bg-white ${
                  errores[campo as keyof AfiliadoInput]
                    ? "border-red-300"
                    : "border-gray-300"
                }`}
              />
              {errores[campo as keyof AfiliadoInput] && (
                <p className="text-red-500 text-xs mt-1">
                  {errores[campo as keyof AfiliadoInput]}
                </p>
              )}
            </div>
          ))}

          {/* Sexo */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Sexo</label>
            <select
              name="sexo"
              value={formData.sexo}
              onChange={handleChange}
              className="border p-2 rounded bg-white"
            >
              <option value="F">Femenino</option>
              <option value="M">Masculino</option>
              <option value="X">Otro</option>
            </select>
          </div>

          {/* Estado civil */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              Estado civil
            </label>
            <select
              name="estado"
              value={formData.estado ?? ""}
              onChange={handleChange}
              className={`border p-2 rounded bg-white ${
                errores.estado ? "border-red-300" : "border-gray-300"
              }`}
            >
              <option value="">Seleccionar estado civil</option>
              <option value="soltero">Soltero/a</option>
              <option value="casado">Casado/a</option>
              <option value="divorciado">Divorciado/a</option>
              <option value="viudo">Viudo/a</option>
            </select>
            {errores.estado && (
              <p className="text-red-500 text-xs mt-1">{errores.estado}</p>
            )}
          </div>
        </div>

        {/* 💼 Datos Laborales */}
        <h3 className="col-span-3 text-md font-bold text-gray-600 mt-6">
          Datos laborales
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              Situación laboral
            </label>
            <select
              name="situacionLaboral"
              value={formData.situacionLaboral ?? ""}
              onChange={handleChange}
              className="border p-2 rounded bg-white"
            >
              <option value="contratado">Contratado</option>
              <option value="efectivo">Efectivo</option>
              <option value="temporal">Temporal</option>
              <option value="monotributo">Monotributo</option>
              <option value="desempleado">Desempleado</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Planta</label>
            <select
              name="planta"
              value={formData.planta ?? "sin planta"}
              onChange={handleChange}
              className="border p-2 rounded bg-white"
            >
              <option value="sin_planta">Sin planta</option>
              <option value="planta 2">Planta 2</option>
              <option value="planta 3">Planta 3</option>
              <option value="planta 4">Planta 4</option>
              <option value="planta 5">Planta 5</option>
              <option value="planta 6">Planta 6</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              Fecha alta empresa
            </label>
            <input
              type="date"
              name="fechaAltaEmpresa"
              value={formData.fechaAltaEmpresa ?? ""}
              onChange={handleChange}
              className="border p-2 rounded bg-white"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Empresa</label>
            <select
              name="empresaId"
              value={formData.empresaId ?? "sin_empresa"}
              onChange={handleChange}
              className="border p-2 rounded bg-white"
            >
              <option value="sin_empresa">Sin empresa asignada</option>
              {empresas.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 📋 Estado de Afiliación */}
        <h3 className="col-span-3 text-md font-bold text-gray-600 mt-6">
          Estado de afiliación
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              Situación afiliado
            </label>
            <select
              name="situacionAfiliado"
              value={formData.situacionAfiliado}
              onChange={handleChange}
              className="border p-2 rounded bg-white"
            >
              <option value="activo">Activo</option>
              <option value="suspendido">Suspendido</option>
              <option value="baja">Baja</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              ¿Es diabético?
            </label>
            <select
              name="diabetico"
              value={formData.diabetico ? "true" : "false"}

              onChange={(e) =>
                setFormData({
                  ...formData,
                  diabetico: e.target.value === "true",
                })
              }
              className="border p-2 rounded bg-white"
            >
              <option value="false">No</option>
              <option value="true">Sí</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              ¿Tiene plan materno?
            </label>
            <select
              name="planMaterno"
              value={formData.planMaterno ? "true" : "false"}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  planMaterno: e.target.value === "true",
                })
              }
              className="border p-2 rounded bg-white"
            >
              <option value="false">No</option>
              <option value="true">Sí</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              ¿Tiene certificado de discapacidad?
            </label>
            <select
              name="certificadoDiscapacidad"
              value={formData.certificadoDiscapacidad ? "true" : "false"}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  certificadoDiscapacidad: e.target.value === "true",
                })
              }
              className="border p-2 rounded bg-white"
            >
              <option value="false">No</option>
              <option value="true">Sí</option>
            </select>
          </div>
        </div>

        {/* ✅ Botones */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-200 rounded-lg"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#1F5D89] hover:bg-[#164766] text-white rounded-lg"
          >
            {isEditing ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}
