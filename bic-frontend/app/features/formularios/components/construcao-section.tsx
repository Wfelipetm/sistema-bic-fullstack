"use client"

import { useEffect, useState, useRef } from "react"
import { toast } from "sonner"
// Adiciona tipagem global para a função de validação
declare global {
  interface Window {
    __validateRequiredConstrucao?: () => boolean;
  }
}
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
  // Função de validação obrigatória
  function checkCardsAndToast() {
    const obrigatorios = [
      { key: "piso", label: "Piso" },
      { key: "forro", label: "Forro" },
      { key: "cobertura", label: "Cobertura" },
      { key: "tipo", label: "Tipo" },
      { key: "esquadrias", label: "Esquadrias" },
      { key: "acabamentoInterno", label: "Acabamento Interno" },
      { key: "acabamentoExterno", label: "Acabamento Externo" },
      { key: "uso", label: "Uso" },
      { key: "tipoConstrucao", label: "Tipo de Construção" },
    ];
    for (const grupo of obrigatorios) {
      const opcoes = formData.construcao[grupo.key as keyof typeof formData.construcao];
      if (!opcoes || !Object.values(opcoes).some(Boolean)) {
        toast.warning(`Selecione pelo menos uma opção em ${grupo.label}.`);
        return false;
      }
    }
    return true;
  }

  // Exponha a função de validação para o componente pai via window (workaround para navegação)
  useEffect(() => {
    window.__validateRequiredConstrucao = checkCardsAndToast;
    return () => { delete window.__validateRequiredConstrucao; };
  }, [formData]);

  // Estados para opções dinâmicas da API (mantidos)
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
    { id: "estuque", label: "Estuque", icon: <Warehouse size={18} /> },
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
  const [tipoOptions, setTipoOptions] = useState([
    { id: "casa", label: "Casa", icon: <Home size={18} /> },
    { id: "apartamento", label: "Apartamento", icon: <Building2 size={18} /> },
    { id: "sala", label: "Sala", icon: <Landmark size={18} /> },
    { id: "loja", label: "Loja", icon: <Store size={18} /> },
    { id: "galpao", label: "Galpão", icon: <Factory size={18} /> },
    { id: "templo", label: "Templo", icon: <Church size={18} /> },
  ])
  const [esquadriasOptions, setEsquadriasOptions] = useState([
    { id: "rustica", label: "Rústica", icon: <DoorOpen size={18} /> },
    { id: "madeira", label: "Madeira", icon: <DoorOpen size={18} /> },
    { id: "ferro", label: "Ferro", icon: <Lock size={18} /> },
    { id: "aluminio", label: "Alumínio", icon: <Sparkles size={18} /> },
    { id: "especial", label: "Especial", icon: <Gem size={18} /> },
    { id: "blindex", label: "Blindex", icon: <DoorOpen size={18} /> },
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
  const [usoOptions, setUsoOptions] = useState([
    { id: "residencial", label: "Residencial", icon: <Home size={18} /> },
    { id: "comercial", label: "Comercial", icon: <Store size={18} /> },
    { id: "servico", label: "Serviço", icon: <Wrench size={18} /> },
    { id: "industrial", label: "Industrial", icon: <Factory size={18} /> },
    { id: "religioso", label: "Religioso", icon: <Church size={18} /> },
  ])
  const [tipoConstrucaoOptions, setTipoConstrucaoOptions] = useState([
    { id: "madeira_interna", label: "Madeira", icon: <Warehouse size={18} /> },
    { id: "alvenaria", label: "Alvenaria", icon: <BrickWall size={18} /> },
    { id: "metalica", label: "Metálica", icon: <Construction size={18} /> },
    { id: "concreto", label: "Concreto", icon: <Landmark size={18} /> },
    { id: "misto", label: "Misto", icon: <Hammer size={18} /> },
  ])

  // Animação dos ícones
  const iconAnimClass = "animate-pulse";

  // Bloco de resumo visual para cada card
  function CardResumo({ icon, title, selectedLabels, dica, impact }: {
    icon: React.ReactNode;
    title: string;
    selectedLabels: string;
    dica: string;
    impact: string;
  }) {
    return (
      <div className="mt-6 text-xs text-sky-700 bg-sky-50 rounded-lg p-3 border border-sky-100">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-8 h-8 text-sky-400 drop-shadow animate-pulse">{icon}</span>
          <span className="font-semibold text-sky-800 text-base">{title}: {impact}</span>
        </div>
        <span className="font-bold text-sky-900">{selectedLabels}</span>
        <span className="block mt-2">{dica}</span>
      </div>
    );
  }

  // Card de seção no estilo TerrenoSection
  function SectionCard({ title, options, subsection, icon, resumoIcon, resumoImpact, resumoDica }: {
    title: string;
    options: { id: string; label: string; icon: React.ReactNode }[];
    subsection: keyof typeof formData.construcao;
    icon: React.ReactNode;
    resumoIcon: React.ReactNode;
    resumoImpact: string;
    resumoDica: string;
  }) {
    const selectedLabels = options.filter((opt) => (formData.construcao[subsection] && (formData.construcao[subsection] as Record<string, boolean>)[opt.id])).map((opt) => opt.label).join(", ");
    return (
      <div className="snap-start flex-shrink-0 w-full max-w-screen min-h-[320px] md:min-w-[320px] md:max-w-[370px] lg:min-w-[340px] lg:max-w-[400px] xl:min-w-[360px] xl:max-w-[420px] bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl shadow-2xl border border-sky-100 p-8 flex flex-col mx-auto mb-4 select-none"
        style={{ boxShadow: '0 8px 32px 0 rgba(80, 150, 255, 0.18), 0 1.5px 8px 0 rgba(80, 150, 255, 0.10)' }}>
        <div className="flex items-center gap-3 mb-6">
          <div className={`text-2xl ${iconAnimClass}`}>{icon}</div>
          <h4 className="text-xl font-bold text-sky-800">{title}</h4>
          <div className="flex-1 h-px bg-sky-200"></div>
        </div>
        <div className="flex flex-col gap-4">
            {options.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white rounded-xl shadow-sm border border-slate-200 p-4 hover:shadow-md hover:border-sky-200 hover:-translate-y-0.5 transition-all duration-300 ease-in-out cursor-pointer flex items-center justify-between"
              onClick={() =>
              handleNestedCheckboxChange(
                "construcao",
                subsection,
                item.id,
                !(formData.construcao[subsection] && (formData.construcao[subsection] as Record<string, boolean>)[item.id]),
              )
              }
            >
              <div className="flex items-center gap-3">
              <div className={`text-lg opacity-70 group-hover:opacity-100 transition-opacity duration-200 ${iconAnimClass}`}>{item.icon}</div>
              <span className="font-medium text-sky-700 group-hover:text-sky-800 transition-colors duration-200">
                {item.label}
              </span>
              </div>
              <div className="ml-auto pl-4 flex items-center">
              <CheckboxField
                id={item.id}
                label={null}
                description=""
                checked={formData.construcao[subsection] && (formData.construcao[subsection] as Record<string, boolean>)[item.id]}
                onCheckedChange={(checked) => handleNestedCheckboxChange("construcao", subsection, item.id, checked)}
              />
              </div>
              <div
              className={`absolute inset-0 rounded-xl border-2 pointer-events-none transition-all duration-200 ${
                formData.construcao[subsection] && (formData.construcao[subsection] as Record<string, boolean>)[item.id]
                ? "border-sky-400 bg-sky-50/30"
                : "border-transparent"
              }`}
              ></div>
            </div>
            ))}
        </div>
        <div className="flex-1"></div>
        <CardResumo icon={resumoIcon} title={title} selectedLabels={selectedLabels} impact={resumoImpact} dica={resumoDica} />
      </div>
    );
  }

  const [dragScrollRef, isDragging] = useHorizontalDragScroll();
  return (
    <div className="w-full max-w-screen mx-auto overflow-hidden px-4">

      <div
        ref={dragScrollRef}
        className="overflow-x-auto flex pb-4 hide-scrollbar cursor-grab"
        style={{ userSelect: 'none', WebkitUserSelect: 'none', msUserSelect: 'none' }}
      >
        <div className="flex flex-nowrap gap-8 max-w-[320px]">
          <SectionCard
            title="Piso"
            options={pisoOptions}
            subsection="piso"
            icon={<Ruler className="w-6 h-6 text-sky-500" />}
            resumoIcon={<Ruler className="w-8 h-8 text-sky-400 drop-shadow" />}
            resumoImpact="Base e conforto"
            resumoDica="O piso define o conforto térmico e a durabilidade do ambiente. Escolha de acordo com o uso do cômodo."
          />
          <SectionCard
            title="Forro"
            options={forroOptions}
            subsection="forro"
            icon={<Square className="w-6 h-6 text-sky-500" />}
            resumoIcon={<Square className="w-8 h-8 text-sky-400 drop-shadow" />}
            resumoImpact="Isolamento e estética"
            resumoDica="O forro contribui para o isolamento térmico e acústico, além de valorizar o acabamento."
          />
          <SectionCard
            title="Cobertura"
            options={coberturaOptions}
            subsection="cobertura"
            icon={<Home className="w-6 h-6 text-sky-500" />}
            resumoIcon={<Home className="w-8 h-8 text-sky-400 drop-shadow" />}
            resumoImpact="Proteção e durabilidade"
            resumoDica="A cobertura protege a edificação das intempéries. Escolha materiais adequados ao clima local."
          />
          <SectionCard
            title="Tipo"
            options={tipoOptions}
            subsection="tipo"
            icon={<Home className="w-6 h-6 text-sky-500" />}
            resumoIcon={<Home className="w-8 h-8 text-sky-400 drop-shadow" />}
            resumoImpact="Função do imóvel"
            resumoDica="O tipo define o uso principal da construção. Selecione conforme a finalidade do imóvel."
          />
          <SectionCard
            title="Esquadrias"
            options={esquadriasOptions}
            subsection="esquadrias"
            icon={<DoorOpen className="w-6 h-6 text-sky-500" />}
            resumoIcon={<DoorOpen className="w-8 h-8 text-sky-400 drop-shadow" />}
            resumoImpact="Ventilação e segurança"
            resumoDica="As esquadrias influenciam a ventilação, iluminação e segurança dos ambientes."
          />
          <SectionCard
            title="Acabamento Interno"
            options={acabamentoInternoOptions}
            subsection="acabamentoInterno"
            icon={<Paintbrush className="w-6 h-6 text-sky-500" />}
            resumoIcon={<Paintbrush className="w-8 h-8 text-sky-400 drop-shadow" />}
            resumoImpact="Conforto e estética"
            resumoDica="O acabamento interno valoriza o ambiente e proporciona conforto aos usuários."
          />
          <SectionCard
            title="Acabamento Externo"
            options={acabamentoExternoOptions}
            subsection="acabamentoExterno"
            icon={<Brush className="w-6 h-6 text-sky-500" />}
            resumoIcon={<Brush className="w-8 h-8 text-sky-400 drop-shadow" />}
            resumoImpact="Proteção e valorização"
            resumoDica="O acabamento externo protege a edificação e valoriza a fachada."
          />
          <SectionCard
            title="Uso"
            options={usoOptions}
            subsection="uso"
            icon={<Target className="w-6 h-6 text-sky-500" />}
            resumoIcon={<Target className="w-8 h-8 text-sky-400 drop-shadow" />}
            resumoImpact="Finalidade do imóvel"
            resumoDica="O uso define a destinação do imóvel: residencial, comercial, etc."
          />
          <SectionCard
            title="Tipo de Construção"
            options={tipoConstrucaoOptions}
            subsection="tipoConstrucao"
            icon={<Construction className="w-6 h-6 text-sky-500" />}
            resumoIcon={<Construction className="w-8 h-8 text-sky-400 drop-shadow" />}
            resumoImpact="Estrutura principal"
            resumoDica="O tipo de construção determina a estrutura e a durabilidade do imóvel."
          />
        </div>
      </div>
    </div>
  );
}
