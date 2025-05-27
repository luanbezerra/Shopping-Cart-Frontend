# Vishop

Uma aplicação de e-commerce feita com React, TypeScript, Vite e Tailwind CSS.

## 🚀 Como rodar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) (recomendado v18 ou superior)
- [pnpm](https://pnpm.io/) (gerenciador de pacotes)

### Passos

```bash
git clone
cd Shopping-Cart-Frontend
pnpm install
pnpm dev
```

## 📁 Estrutura do Projeto

- **public/**  
  Contém arquivos estáticos carregados diretamente:

  - `index.html` — ponto de entrada HTML da aplicação.
  - `vishop.png` — logo principal.
  - `imgs/` — pasta com todas as imagens dos produtos.

- **src/components/**  
  Componentes reutilizáveis da interface:

  - `Navbar.tsx` — barra de navegação com campo de busca, filtros por seção, preview do carrinho e seleção de termos.
  - `StoreItem.tsx` — card de produto clicável exibido na grade de produtos.

- **src/context/**  
  Gerenciamento de estado global:

  - `ShoppingCartContext.tsx` — Context API para manter o estado do carrinho sincronizado com o `localStorage`.

- **src/data/**  
  Armazena dados estáticos:

  - `products.json` — lista de produtos (SKU, nome, preço, termos, seção, caminho da imagem).

- **src/pages/**  
  Páginas principais da aplicação:

  - `Store.tsx` — exibe a grade responsiva de produtos, com filtros de texto, termos e seção.
  - `ProductView.tsx` — detalhamento do produto: imagem grande, título, descrição, tags, preço e controles de quantidade.
  - `Cart.tsx` — dropdown de preview do carrinho, ajuste de quantidades, resumo de pedido e botão de checkout.
  - `Checkout.tsx` — modal de confirmação de compra (“Purchase Successful!”).

- **App.tsx**  
  Configuração de rotas (React Router) e provedor do carrinho.

- **main.tsx**  
  Ponto de entrada do Vite e renderização do React.

- **style.css**  
  Importação e configuração do Tailwind CSS.

---

## ⭐ Funcionalidades Principais

### 1. Carrinho de Compras

- Ícone na navbar com badge mostrando a quantidade de itens.
- Preview dropdown ao passar o mouse: lista de itens com foto, nome, preço e botões “+” / “–”.
- Order Summary fixo: subtotal, indicador de frete grátis e botão “Checkout”.
- Persistência em `localStorage`, garantindo que o carrinho sobreviva ao recarregamento da página.

### 2. Página de Produto

- Imagem principal em proporção vertical, exibida em destaque.
- Título e descrição detalhados, com tags de termos e seção.
- Preço destacado e controles de "+" / "–" para ajuste de quantidade.
- Botão “Go to Cart” estilizado para redirecionar ao carrinho.

### 3. Filtros e Pesquisa

- Busca por texto que filtra nome, descrição e termos dos produtos.
- Filtro por **terms** (categorias) via botões na base da navbar, com scroll horizontal contínuo.
- Popover customizado para filtrar por **section** (masculino/feminino) em estilo minimalista.

### 4. Persistência de Dados Locais

- Estado do carrinho automaticamente lido e gravado no `localStorage`.

### 5. Layout Responsivo

- Grid de produtos que se adapta ao tamanho da tela (desktop e mobile).
- Navbar, popovers e modais ajustados para diferentes resoluções, mantendo usabilidade e estética.

---
