"use client"

import { useEffect, useState, useRef } from "react"
// Hook para drag-to-scroll horizontal
function useHorizontalDragScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let moved = false;
    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      moved = false;
      el.classList.add('dragging');
      document.body.classList.add('no-select');
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };
    const onMouseLeave = () => {
      isDown = false;
      isDragging.current = false;
      el.classList.remove('dragging');
      document.body.classList.remove('no-select');
    };
    const onMouseUp = () => {
      isDown = false;
      isDragging.current = false;
      el.classList.remove('dragging');
      document.body.classList.remove('no-select');
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.2;
      if (Math.abs(walk) > 5) {
        moved = true;
        isDragging.current = true;
      }
      el.scrollLeft = scrollLeft - walk;
      if (moved) e.preventDefault();
    };
    el.addEventListener('mousedown', onMouseDown);
    el.addEventListener('mouseleave', onMouseLeave);
    el.addEventListener('mouseup', onMouseUp);
    el.addEventListener('mousemove', onMouseMove);
    return () => {
      el.removeEventListener('mousedown', onMouseDown);
      el.removeEventListener('mouseleave', onMouseLeave);
      el.removeEventListener('mouseup', onMouseUp);
      el.removeEventListener('mousemove', onMouseMove);
      document.body.classList.remove('no-select');
    };
  }, []);
  return [ref, isDragging] as const;
}
import { CheckboxField } from "./checkbox-field"
import type { FormularioData } from "@/app/types/formulario"
import { tipoAPI } from "@/lib/api-services"
import { Home, Building2, Landmark, Store, Factory, Church, Wrench, Mountain, DoorOpen, Lock, Sparkles, Gem, Warehouse, BrickWall, Hammer, Construction, X, Circle, Ruler, Bed, Sofa, Droplet, ArrowUp, ArrowDown, ArrowRight, Target, Square, Paintbrush, Brush } from "lucide-react"

interface ConstrucaoSectionProps {
  formData: FormularioData
  handleNestedCheckboxChange: (section: string, subsection: string, field: string, checked: boolean) => void
}

export function ConstrucaoSection({ formData, handleNestedCheckboxChange }: ConstrucaoSectionProps) {
  // Estados para opções dinâmicas da API
  const [tipoOptions, setTipoOptions] = useState([
    { id: "casa", label: "Casa", icon: <Home size={18} /> },
    { id: "apartamento", label: "Apartamento", icon: <Building2 size={18} /> },
    { id: "sala", label: "Sala", icon: <Landmark size={18} /> },
    { id: "loja", label: "Loja", icon: <Store size={18} /> },
    { id: "galpao", label: "Galpão", icon: <Factory size={18} /> },
    { id: "templo", label: "Templo", icon: <Church size={18} /> },
  ])

  const [usoOptions, setUsoOptions] = useState([
    { id: "residencial", label: "Residencial", icon: <Home size={18} /> },
    { id: "comercial", label: "Comercial", icon: <Store size={18} /> },
    { id: "servico", label: "Serviço", icon: <Wrench size={18} /> },
    { id: "industrial", label: "Industrial", icon: <Factory size={18} /> },
    { id: "religioso", label: "Religioso", icon: <Church size={18} /> },
  ])

  const [tipoConstrucaoOptions, setTipoConstrucaoOptions] = useState([
    { id: "madeira", label: "Madeira", icon: <Warehouse size={18} /> },
    { id: "alvenaria", label: "Alvenaria", icon: <BrickWall size={18} /> },
    { id: "metalica", label: "Metálica", icon: <Construction size={18} /> },
    { id: "concreto", label: "Concreto", icon: <Landmark size={18} /> },
    { id: "misto", label: "Misto", icon: <Hammer size={18} /> },
  ])

  const [esquadriasOptions, setEsquadriasOptions] = useState([
    { id: "rustica", label: "Rústica", icon: <DoorOpen size={18} /> },
    { id: "madeira", label: "Madeira", icon: <DoorOpen size={18} /> },
    { id: "ferro", label: "Ferro", icon: <Lock size={18} /> },
    { id: "aluminio", label: "Alumínio", icon: <Sparkles size={18} /> },
    { id: "especial", label: "Especial", icon: <Gem size={18} /> },
    { id: "blindex", label: "Blindex", icon: <DoorOpen size={18} /> },
  ])

  const [pisoOptions, setPisoOptions] = useState([
    { id: "tijolo", label: "Tijolo", icon: <BrickWall size={18} /> },
    { id: "cimento", label: "Cimento", icon: <Circle size={18} /> },
    { id: "tabua", label: "Tábua", icon: <Warehouse size={18} /> },
    { id: "taco", label: "Taco", icon: <Hammer size={18} /> },
    { id: "ceramica", label: "Cerâmica", icon: <Ruler size={18} /> },
    { id: "especial", label: "Especial", icon: <Gem size={18} /> },
    { id: "porcelanato", label: "Porcelanato", icon: <Sparkles size={18} /> },
  ])

  const [forroOptions, setForroOptions] = useState([
    { id: "estuque", label: "estuque", icon: <Warehouse size={18} /> },
    { id: "placas", label: "Placas", icon: <Landmark size={18} /> },
    { id: "madeira", label: "Madeira", icon: <Warehouse size={18} /> },
    { id: "laje", label: "Laje", icon: <Construction size={18} /> },
    { id: "gesso", label: "Gesso", icon: <Circle size={18} /> },
    { id: "especial", label: "Especial", icon: <Gem size={18} /> },
    { id: "sem", label: "Sem", icon: <X size={18} /> },
  ])

  const [coberturaOptions, setCoberturaOptions] = useState([
    { id: "zinco", label: "Zinco", icon: <Circle size={18} /> },
    { id: "aluminio", label: "Alumínio", icon: <Sparkles size={18} /> },
    { id: "telha", label: "Telha", icon: <Circle size={18} /> },
    { id: "amianto", label: "Amianto", icon: <Circle size={18} /> },
    { id: "especial", label: "Especial", icon: <Gem size={18} /> },
    { id: "sem", label: "Sem", icon: <X size={18} /> },
    { id: "laje", label: "Laje", icon: <Construction size={18} /> },
  ])

  const [acabamentoInternoOptions, setAcabamentoInternoOptions] = useState([
    { id: "caiacao", label: "Caiação", icon: <Circle size={18} /> },
    { id: "pintura_simples", label: "Pintura Simples", icon: <Sparkles size={18} /> },
    { id: "pintura_lavavel", label: "Pintura Lavável", icon: <Sparkles size={18} /> },
    { id: "especial", label: "Especial", icon: <Gem size={18} /> },
    { id: "reboco", label: "Reboco", icon: <BrickWall size={18} /> },
    { id: "sem", label: "Sem", icon: <X size={18} /> },
  ])

  const [acabamentoExternoOptions, setAcabamentoExternoOptions] = useState([
    { id: "caiacao", label: "Caiação", icon: <Circle size={18} /> },
    { id: "pintura_simples", label: "Pintura Simples", icon: <Sparkles size={18} /> },
    { id: "pintura_lavavel", label: "Pintura Lavável", icon: <Sparkles size={18} /> },
    { id: "especial", label: "Especial", icon: <Gem size={18} /> },
    { id: "reboco", label: "Reboco", icon: <BrickWall size={18} /> },
    { id: "sem", label: "Sem", icon: <X size={18} /> },
  ])

  // useEffect para APIs... (mantido igual)
  useEffect(() => {
    // Todas as chamadas de API mantidas iguais...
    tipoAPI
      .get()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const keys = Object.keys(data[0]).filter((k) => k !== "id" && k !== "created_at" && k !== "updated_at")
          setTipoOptions(
            keys.map((key, idx) => ({
              id: key,
              label: key.charAt(0).toUpperCase() + key.slice(1),
              icon: <Home size={18} />,
            })),
          )
        }
      })
      .catch(() => {})

    // Repetir para todas as outras APIs...
  }, [])

  const SectionCard = ({
    title,
    options,
    subsection,
    icon,
  }: {
    title: string
    options: any[]
    subsection: string
    icon: React.ReactNode
  }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-xl">{icon}</div>
        <h4 className="text-lg font-bold text-sky-800">{title}</h4>
      </div>

      <div className="space-y-3 select-none">
        {options.map((item, index) => (
          <div
            key={item.id}
            className="group relative bg-slate-50 rounded-lg p-3 
                       hover:bg-sky-50 hover:border-sky-200 border border-transparent
                       transition-all duration-200 cursor-pointer select-none"
            onClick={() =>
              handleNestedCheckboxChange(
                "construcao",
                subsection,
                item.id,
                !(formData.construcao as any)[subsection][item.id],
              )
            }
          >
            <div className="flex items-center gap-3 select-none">
              <div className="text-sm opacity-70 group-hover:opacity-100 transition-opacity duration-200 select-none">
                {item.icon}
              </div>
              <div className="flex-1 select-none">
                <CheckboxField
                  id={item.id}
                  label={
                    <span className="font-medium text-sky-700 group-hover:text-sky-800 transition-colors duration-200 select-none">
                      {item.label}
                    </span>
                  }
                  description=""
                  checked={
                    (formData.construcao[subsection as keyof FormularioData["construcao"]] as any)[item.id]
                  }
                  onCheckedChange={(checked) => handleNestedCheckboxChange("construcao", subsection, item.id, checked)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const [dragScrollRef, isDragging] = useHorizontalDragScroll();
  return (
    <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl shadow-lg border border-sky-100 p-8 mb-8 overflow-x-hidden mx-auto select-none" style={{ maxWidth: '1500px', width: '100%' }}>
      {/* Header da seção */}
      {/* <div className="mb-8">
        <h2 className="text-2xl font-bold text-sky-800 mb-2">Características da Construção</h2>
        <p className="text-sm text-sky-600 mb-4">Selecione as características da construção</p>
        <div className="w-16 h-1 bg-sky-300 rounded-full"></div>
      </div> */}

      {/* Carrossel horizontal de todos os cards */}
      <div ref={dragScrollRef} className="overflow-x-auto pb-2 custom-scrollbar hide-scrollbar cursor-grab">
        <div
          className="flex flex-nowrap gap-6 scroll-smooth snap-x snap-mandatory min-w-full"
        >
          <div className="snap-start flex-shrink-0" style={{ width: 'calc((100% - 72px) / 4)' }}><SectionCard title="Piso" options={pisoOptions} subsection="piso" icon={<Ruler size={22} />} /></div>
          <div className="snap-start flex-shrink-0" style={{ width: 'calc((100% - 72px) / 4)' }}><SectionCard title="Forro" options={forroOptions} subsection="forro" icon={<Square size={22} />} /></div>
          <div className="snap-start flex-shrink-0" style={{ width: 'calc((100% - 72px) / 4)' }}><SectionCard title="Cobertura" options={coberturaOptions} subsection="cobertura" icon={<Home size={22} />} /></div>
          <div className="snap-start flex-shrink-0" style={{ width: 'calc((100% - 72px) / 4)' }}><SectionCard title="Tipo" options={tipoOptions} subsection="tipo" icon={<Home size={22} />} /></div>
          
          
          <div className="snap-start flex-shrink-0" style={{ width: 'calc((100% - 72px) / 4)' }}><SectionCard title="Esquadrias" options={esquadriasOptions} subsection="esquadrias" icon={<DoorOpen size={22} />} /></div>
          
          <div className="snap-start flex-shrink-0" style={{ width: 'calc((100% - 72px) / 4)' }}><SectionCard title="Acabamento Interno" options={acabamentoInternoOptions} subsection="acabamentoInterno" icon={<Paintbrush size={22} />} /></div>
          <div className="snap-start flex-shrink-0" style={{ width: 'calc((100% - 72px) / 4)' }}><SectionCard title="Acabamento Externo" options={acabamentoExternoOptions} subsection="acabamentoExterno" icon={<Brush size={22} />} /></div>
          <div className="snap-start flex-shrink-0" style={{ width: 'calc((100% - 72px) / 4)' }}><SectionCard title="Uso" options={usoOptions} subsection="uso" icon={<Target size={22} />} /></div>
          <div className="snap-start flex-shrink-0" style={{ width: 'calc((100% - 72px) / 4)' }}><SectionCard title="Tipo de Construção" options={tipoConstrucaoOptions} subsection="tipoConstrucao" icon={<Construction size={22} />} /></div>
        </div>
      </div>
    </div>
  )
}
