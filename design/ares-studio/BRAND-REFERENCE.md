# Ares Studio: referência visual mestre, Opção 2

**WO:** `IRIS-BRD-REF-001` | **Branch:** `docs/ares-brand-option2-master` | **Baseline inicial:** `2a5f4be64c41aeecd9844de864255cec7fa24fe2`.

## Decisão visual explícita do usuário
- Conceito **Opção 2**, aprovado na conversa em 2026-11-15.
- Marca pública alvo **Ares Studio**; identidade combina **íris de câmera + A + órbita verde-limão**.
- Dark mode premium, UI preta/grafite, ação lime e superfícies discretas; visual para vídeo, imagem, áudio e 3D.
- A imagem gerada original Opção 2 é a **referência estética de maior fidelidade**. Os SVGs incluídos aqui são **reconstruções vetoriais propostas**, **não equivalentes pixel a pixel** à prancha aprovada.

## Conteúdo versionado nesta branch
- `vector/ares-symbol.svg` (ícone original vetorial reconstruído)
- `vector/ares-logo-dark.svg` e `vector/ares-logo-light.svg` (lockups)
- `vector/ares-symbol-mono.svg`
- `vector/ares-favicon.svg`, `vector/ares-app-icon.svg`
- `vector/ares-watermark.svg`, `vector/ares-social-header.svg`
- `screens/dashboard-concept.svg` e `reference/option-2-vector-interpretation.svg`
- `brand-tokens.json` e este guia.

## Evidência raster original e limites de publicação
As imagens PNG originais da geração e derivados não devem ser representados como versionados até serem verificados no GitHub. Este commit contém **apenas arquivos texto/vetoriais e guia**, sem substituir os PNGs originais por SVGs artificiais. O pacote local completo com os PNGs será disponibilizado separadamente. **Pendente:** anexar os originais PNG como evidência gráfica de máxima fidelidade ao repositório antes do aceite completo do WO.

## Hierarquia de fidelidade para o executor
1. Direção selecionada: prancha original da Opção 2 (fora desta branch até upload verificável).
2. `reference/option-2-vector-interpretation.svg` e `screens/dashboard-concept.svg` como guias editáveis.
3. SVGs com semântica exata, ícone, marca e tokens desta pasta para iniciar componentes.
4. Design system atual do produto, comportamento existente e DoD/Architecture/Scope do repositório prevalecem em decisões funcionais.

## Critérios para entrega futura
- Sem trocar nomes técnicos, assets usados por runtime ou COPYRIGHT de terceiros na fase de referência.
- SVGs sem scripts, chamadas remotas ou raster embutido; verificar render em browsers.
- Testar legibilidade 16/32/64 px; caso o símbolo detalhado não funcione em 16px, criar variante simplificada aprovada.
- Converter textos de lockup a paths editáveis antes de masterização final se depender de fonte local; conferir licenciamento da tipografia.
- Acessibilidade AA, reduce-motion, responsividade e nenhuma funcionalidade fictícia (créditos/jobs são apenas mockup).
- Arquivos de referência não equivalem à implementação da marca no produto.

## Pendências de aprovação
- Comparação visual com PNG original; QA de render SVG e branding; licença/proveniência; checks de CI; confirmação de downstream assets.
- PR é **Draft**, sem merge até auditoria `APPROVED` e sem alteração de checkpoint canônico nesta branch.

Relacionadas: #22, #23, #24, #25, #28, #29, #32.
