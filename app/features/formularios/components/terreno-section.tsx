"use client"

import { useEffect, useRef, useState } from "react"
import { CheckboxField } from "./checkbox-field"
import type { FormularioData } from "@/app/types/formulario"
import { situacaoAPI, caracterSoloAPI, topografiaAPI, nivelamentoAPI } from "@/lib/api-services"
import { Landmark, Leaf, Mountain, Ruler } from "lucide-react"

interface TerrenoSectionProps {
  formData: FormularioData
  handleNestedCheckboxChange: (section: string, subsection: string, field: string, checked: boolean) => void
}

export function TerrenoSection({ formData, handleNestedCheckboxChange }: TerrenoSectionProps) {
  // Ref para drag-scroll do carrossel
  const dragScrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const slider = dragScrollRef.current;
    if (!slider) return;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      slider.classList.add('scrolling');
      startX.current = e.pageX - slider.offsetLeft;
      scrollLeft.current = slider.scrollLeft;
    };
    const handleMouseLeave = () => {
      isDragging.current = false;
      slider.classList.remove('scrolling');
    };
    const handleMouseUp = () => {
      isDragging.current = false;
      slider.classList.remove('scrolling');
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX.current) * 1.2;
      slider.scrollLeft = scrollLeft.current - walk;
    };
    slider.addEventListener('mousedown', handleMouseDown);
    slider.addEventListener('mouseleave', handleMouseLeave);
    slider.addEventListener('mouseup', handleMouseUp);
    slider.addEventListener('mousemove', handleMouseMove);

    // Touch events
    let touchStartX = 0;
    let touchScrollLeft = 0;
    const handleTouchStart = (e: TouchEvent) => {
      isDragging.current = true;
      touchStartX = e.touches[0].pageX - slider.offsetLeft;
      touchScrollLeft = slider.scrollLeft;
    };
    const handleTouchEnd = () => {
      isDragging.current = false;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      const x = e.touches[0].pageX - slider.offsetLeft;
      const walk = (x - touchStartX) * 1.2;
      slider.scrollLeft = touchScrollLeft - walk;
    };
    slider.addEventListener('touchstart', handleTouchStart);
    slider.addEventListener('touchend', handleTouchEnd);
    slider.addEventListener('touchmove', handleTouchMove);

    return () => {
      slider.removeEventListener('mousedown', handleMouseDown);
      slider.removeEventListener('mouseleave', handleMouseLeave);
      slider.removeEventListener('mouseup', handleMouseUp);
      slider.removeEventListener('mousemove', handleMouseMove);
      slider.removeEventListener('touchstart', handleTouchStart);
      slider.removeEventListener('touchend', handleTouchEnd);
      slider.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);
  const [situacaoOptions, setSituacaoOptions] = useState([
    { id: "encravamento", label: "Encravamento", icon: <Landmark className="w-6 h-6 text-sky-500" /> },
    { id: "vila", label: "Vila", icon: <Landmark className="w-6 h-6 text-sky-500" /> },
    { id: "meio_quadra", label: "Meio de Quadra", icon: <Landmark className="w-6 h-6 text-sky-500" /> },
    { id: "esquina", label: "Esquina", icon: <Landmark className="w-6 h-6 text-sky-500" /> },
    { id: "tres_frentes", label: "Três Frentes", icon: <Landmark className="w-6 h-6 text-sky-500" /> },
    { id: "toda_quadra", label: "Toda a Quadra", icon: <Landmark className="w-6 h-6 text-sky-500" /> },
  ])

  const [soloOptions, setSoloOptions] = useState([
    { id: "alagadico", label: "Alagadiço", icon: <Leaf className="w-6 h-6 text-sky-500" /> },
    { id: "arenoso", label: "Arenoso", icon: <Leaf className="w-6 h-6 text-sky-500" /> },
    { id: "rochoso", label: "Rochoso", icon: <Leaf className="w-6 h-6 text-sky-500" /> },
    { id: "normal", label: "Normal", icon: <Leaf className="w-6 h-6 text-sky-500" /> },
  ])

  const [topografiaOptions, setTopografiaOptions] = useState([
    { id: "aclive", label: "Aclive", icon: <Mountain className="w-6 h-6 text-sky-500" /> },
    { id: "declive", label: "Declive", icon: <Mountain className="w-6 h-6 text-sky-500" /> },
    { id: "encosta", label: "Encosta", icon: <Mountain className="w-6 h-6 text-sky-500" /> },
    { id: "horizontal", label: "Horizontal", icon: <Mountain className="w-6 h-6 text-sky-500" /> },
  ])

  const [nivelamentoOptions, setNivelamentoOptions] = useState([
    { id: "abaixoNivel", label: "Abaixo do Nível da Rua", icon: <Ruler className="w-6 h-6 text-sky-500" /> },
    { id: "aoNivel", label: "Ao Nível da Rua", icon: <Ruler className="w-6 h-6 text-sky-500" /> },
    { id: "acimaNivel", label: "Acima do Nível da Rua", icon: <Ruler className="w-6 h-6 text-sky-500" /> },
  ])

  useEffect(() => {
    situacaoAPI.get().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        const keys = Object.keys(data[0]).filter((k) => k !== "id" && k !== "created_at" && k !== "updated_at")
        setSituacaoOptions(
          keys.map((key, idx) => ({
            id: key,
            label: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " "),
            icon: <Landmark className="w-6 h-6 text-sky-500" />,
          })),
        )
      }
    })

    caracterSoloAPI.get().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        const keys = Object.keys(data[0]).filter((k) => k !== "id" && k !== "created_at" && k !== "updated_at")
        setSoloOptions(
          keys.map((key, idx) => ({
            id: key,
            label: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " "),
            icon: <Leaf className="w-6 h-6 text-sky-500" />,
          })),
        )
      }
    })

    topografiaAPI.get().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        const keys = Object.keys(data[0]).filter((k) => k !== "id" && k !== "created_at" && k !== "updated_at")
        setTopografiaOptions(
          keys.map((key, idx) => ({
            id: key,
            label: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " "),
            icon: <Mountain className="w-6 h-6 text-sky-500" />,
          })),
        )
      }
    })

    nivelamentoAPI.get().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        const keys = Object.keys(data[0]).filter((k) => k !== "id" && k !== "created_at" && k !== "updated_at")
        setNivelamentoOptions(
          keys.map((key, idx) => ({
            id: key,
            label: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " "),
            icon: <Ruler className="w-6 h-6 text-sky-500" />,
          })),
        )
      }
    })
  }, [])

  // Carrossel horizontal para opções dentro de cada card
  function OptionsCarousel({ options, subsection }: { options: any[]; subsection: string }) {
    const optionsRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    useEffect(() => {
      const slider = optionsRef.current;
      if (!slider) return;
      const handleMouseDown = (e: MouseEvent) => {
        isDragging.current = true;
        slider.classList.add('scrolling');
        startX.current = e.pageX - slider.offsetLeft;
        scrollLeft.current = slider.scrollLeft;
      };
      const handleMouseLeave = () => {
        isDragging.current = false;
        slider.classList.remove('scrolling');
      };
      const handleMouseUp = () => {
        isDragging.current = false;
        slider.classList.remove('scrolling');
      };
      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging.current) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX.current) * 1.2;
        slider.scrollLeft = scrollLeft.current - walk;
      };
      slider.addEventListener('mousedown', handleMouseDown);
      slider.addEventListener('mouseleave', handleMouseLeave);
      slider.addEventListener('mouseup', handleMouseUp);
      slider.addEventListener('mousemove', handleMouseMove);
      // Touch events
      let touchStartX = 0;
      let touchScrollLeft = 0;
      const handleTouchStart = (e: TouchEvent) => {
        isDragging.current = true;
        touchStartX = e.touches[0].pageX - slider.offsetLeft;
        touchScrollLeft = slider.scrollLeft;
      };
      const handleTouchEnd = () => {
        isDragging.current = false;
      };
      const handleTouchMove = (e: TouchEvent) => {
        if (!isDragging.current) return;
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - touchStartX) * 1.2;
        slider.scrollLeft = touchScrollLeft - walk;
      };
      slider.addEventListener('touchstart', handleTouchStart);
      slider.addEventListener('touchend', handleTouchEnd);
      slider.addEventListener('touchmove', handleTouchMove);
      return () => {
        slider.removeEventListener('mousedown', handleMouseDown);
        slider.removeEventListener('mouseleave', handleMouseLeave);
        slider.removeEventListener('mouseup', handleMouseUp);
        slider.removeEventListener('mousemove', handleMouseMove);
        slider.removeEventListener('touchstart', handleTouchStart);
        slider.removeEventListener('touchend', handleTouchEnd);
        slider.removeEventListener('touchmove', handleTouchMove);
      };
    }, []);
    return (
      <div
        ref={optionsRef}
        className="overflow-x-auto flex gap-4 hide-scrollbar pb-2 cursor-grab"
        style={{ userSelect: 'none', WebkitUserSelect: 'none', msUserSelect: 'none' }}
      >
        {options.map((item, index) => (
          <div
            key={item.id}
            className="group relative bg-white rounded-xl shadow-sm border border-slate-200 p-4 min-w-[200px] max-w-[220px] flex-shrink-0 hover:shadow-md hover:border-sky-200 hover:-translate-y-0.5 transition-all duration-300 ease-in-out cursor-pointer"
            onClick={() =>
              handleNestedCheckboxChange(
                "terreno",
                subsection,
                item.id,
                !(formData.terreno[subsection as keyof typeof formData.terreno] as any)[item.id],
              )
            }
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="text-lg opacity-70 group-hover:opacity-100 transition-opacity duration-200">
                {item.icon}
              </div>
              <span className="font-medium text-sky-700 group-hover:text-sky-800 transition-colors duration-200">
                {item.label}
              </span>
            </div>
            <CheckboxField
              id={item.id}
              label={null}
              description=""
              checked={(formData.terreno[subsection as keyof typeof formData.terreno] as any)[item.id]}
              onCheckedChange={(checked) => handleNestedCheckboxChange("terreno", subsection, item.id, checked)}
            />
            <div
              className={`absolute inset-0 rounded-xl border-2 pointer-events-none transition-all duration-200 ${
                (formData.terreno[subsection as keyof typeof formData.terreno] as any)[item.id]
                  ? "border-sky-400 bg-sky-50/30"
                  : "border-transparent"
              }`}
            ></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1500px] mx-auto">
      <div
        ref={dragScrollRef}
        className="overflow-x-auto flex pb-4 hide-scrollbar cursor-grab"
        style={{ userSelect: 'none', WebkitUserSelect: 'none', msUserSelect: 'none' }}
      >
        <div className="flex flex-nowrap gap-8 min-w-0">
          <div className="snap-start flex-shrink-0 w-[350px] bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl shadow-lg border border-sky-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-2xl"><Landmark className="w-6 h-6 text-sky-500" /></div>
              <h4 className="text-xl font-bold text-sky-800">Situação</h4>
              <div className="flex-1 h-px bg-sky-200"></div>
            </div>
            <OptionsCarousel options={situacaoOptions} subsection="situacao" />
          </div>
          <div className="snap-start flex-shrink-0 w-[350px] bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl shadow-lg border border-sky-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-2xl"><Leaf className="w-6 h-6 text-sky-500" /></div>
              <h4 className="text-xl font-bold text-sky-800">Características do Solo</h4>
              <div className="flex-1 h-px bg-sky-200"></div>
            </div>
            <OptionsCarousel options={soloOptions} subsection="caracteristicasSolo" />
          </div>
          <div className="snap-start flex-shrink-0 w-[350px] bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl shadow-lg border border-sky-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-2xl"><Mountain className="w-6 h-6 text-sky-500" /></div>
              <h4 className="text-xl font-bold text-sky-800">Topografia</h4>
              <div className="flex-1 h-px bg-sky-200"></div>
            </div>
            <OptionsCarousel options={topografiaOptions} subsection="topografia" />
          </div>
          <div className="snap-start flex-shrink-0 w-[350px] bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl shadow-lg border border-sky-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-2xl"><Ruler className="w-6 h-6 text-sky-500" /></div>
              <h4 className="text-xl font-bold text-sky-800">Nivelamento</h4>
              <div className="flex-1 h-px bg-sky-200"></div>
            </div>
            <OptionsCarousel options={nivelamentoOptions} subsection="nivelamento" />
          </div>
        </div>
      </div>
    </div>
  )
}
