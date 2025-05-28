import { createContext, useContext } from "react";

const InfoContext = createContext();

export const InfoProvider = ({ children }) => {
  const info = {
    title: "Ajuda+",
    description: "Uma plataforma para oferecer e receber ajuda no seu bairro.",
  };

  const categorias = [
    {
      id: "necessidades_basicas",
      nome: "Necessidades Básicas",
      descricao:
        "Pedidos ou ofertas de alimentos, roupas, fraldas, móveis, brinquedos, materiais escolares e outros itens essenciais.",
      icone: "shopping-basket",
    },
    {
      id: "cuidados_e_apoio",
      nome: "Cuidados e Apoio",
      descricao:
        "Ajuda com idosos, crianças, pessoas com deficiência, apoio emocional ou psicológico, reforço escolar e acompanhamento para consultas.",
      icone: "hand-heart",
    },
    {
      id: "servicos_e_trabalho",
      nome: "Serviços e Trabalho",
      descricao:
        "Reparos domésticos, mudanças, limpezas, trocas de serviços, bicos ou doações de ferramentas para geração de renda.",
      icone: "tools",
    },
    {
      id: "animais",
      nome: "Ajuda com Animais",
      descricao:
        "Doações de ração, cuidados temporários, adoção ou relatos de animais perdidos/encontrados.",
      icone: "car",
    },
    {
      id: "seguranca_alertas",
      nome: "Segurança e Comunicados",
      descricao:
        "Alertas sobre desaparecimentos, riscos locais ou avisos de segurança comunitária.",
      icone: "book-open",
    },
    {
      id: "transporte_solidario",
      nome: "Transporte Solidário",
      descricao:
        "Caronas, entregas de compras, ajuda com transporte para consultas ou compromissos.",
      icone: "car",
    },
    {
      id: "outros",
      nome: "Outros",
      descricao: "Pedidos ou ofertas que não se encaixam nas categorias acima.",
      icone: "more-horizontal",
    },
  ];

  const getCategoryLabel = (category) => {
    switch (category) {
      case "animais":
        return "Animais";
      case "necessidades_basicas":
        return "Necessidades Básicas";
      case "transporte_solidario":
        return "Transporte Solidário";
      case "seguranca_alertas":
        return "Segurança e Alertas";
      case "outros":
        return "Outros";
      case "cuidados_e_apoio":
        return "Cuidados e Apoio";
      case "servicos_e_trabalho":
        return "Serviços e Trabalho";
      default:
        return category;
    }
  };

  return (
    <InfoContext.Provider value={{ info, categorias, getCategoryLabel }}>
      {children}
    </InfoContext.Provider>
  );
};

export const useInfo = () => useContext(InfoContext);
