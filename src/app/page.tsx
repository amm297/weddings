import Link from "next/link";
import { Mail } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#E2F0D6] to-[#D4E7C5] p-6 text-center">
      <div className="max-w-3xl bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#8AB77B] font-serif">
          Planificador de Bodas
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-gray-700">
          Una plataforma elegante para crear y compartir los detalles de tu boda
          con tus invitados.
        </p>

        <div className="mb-8">
          <p className="text-lg text-gray-600 mb-4">
            Con esta aplicación podrás:
          </p>
          <ul className="text-left mx-auto max-w-md space-y-2 text-gray-600">
            <li className="flex items-center">
              <span className="mr-2">💌</span> Gestionar invitaciones y
              confirmaciones de asistencia
            </li>
            <li className="flex items-center">
              <span className="mr-2">🗓️</span> Compartir los detalles del evento
              y cronograma
            </li>
            <li className="flex items-center">
              <span className="mr-2">🏨</span> Ofrecer información sobre
              alojamiento y transporte
            </li>
            <li className="flex items-center">
              <span className="mr-2">🎁</span> Crear listas de regalos y
              compartir datos bancarios
            </li>
          </ul>
        </div>

        <Link
          href="mailto:"
          className="inline-block bg-[#A0C49D] hover:bg-[#8AB77B] text-white font-medium py-3 px-6 rounded-full transition-colors duration-300"
        >
          <div className="flex items-center justify-center">
            <Mail className="w-4 h-4 mr-2" />
            Contactanos
          </div>
        </Link>
      </div>

      <footer className="mt-12 text-gray-500 text-sm">
        © {new Date().getFullYear()} Planificador de Bodas • Crea momentos
        inolvidables
      </footer>
    </div>
  );
}
