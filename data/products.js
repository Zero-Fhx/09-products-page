const products = [
  {
    id: 1,
    title: 'Tablet 10"',
    image: "https://placehold.co/400",
    description:
      "Tableta con pantalla táctil de 10 pulgadas, resolución HD, procesador de cuatro núcleos, batería de larga duración para hasta 10 horas de uso continuo, ideal para navegar, leer, ver videos y aplicaciones educativas. Diseño ligero y compacto, perfecta para uso diario y transporte fácil.",
    price: 250.0,
    category: "electronics",
  },
  {
    id: 2,
    title: "Jeans ajustados",
    image: "https://placehold.co/400",
    description:
      "Pantalones vaqueros de corte slim que se ajustan perfectamente a la silueta, confeccionados en mezclilla de alta calidad con un toque de elasticidad para mayor comodidad. Presentan un diseño moderno con costuras reforzadas y lavado azul clásico que combina con cualquier outfit casual o semi-formal.",
    price: 35.5,
    category: "clothing",
  },
  {
    id: 3,
    title: "Pulsera de cuero",
    image: "https://placehold.co/400",
    description:
      "Pulsera trenzada hecha a mano con cuero genuino de alta calidad, ideal para complementar looks casuales o formales. Su diseño resistente y ajustable se adapta a la mayoría de muñecas y añade un toque elegante y rústico, perfecta para uso diario o como regalo especial.",
    price: 9.5,
    category: "accessories",
  },
  {
    id: 4,
    title: "Monitor 4K",
    image: "https://placehold.co/400",
    description:
      "Monitor Ultra HD 4K con pantalla de 27 pulgadas que ofrece una resolución nítida y colores vibrantes para profesionales y gamers. Cuenta con tecnología IPS para amplios ángulos de visión, conectividad HDMI y DisplayPort, y diseño ergonómico ajustable para una experiencia visual cómoda y sin fatiga ocular.",
    price: 330.0,
    category: "electronics",
  },
  {
    id: 5,
    title: "Conjunto deportivo",
    image: "https://placehold.co/400",
    description:
      "Conjunto de dos piezas compuesto por camiseta y pantalones deportivos confeccionados en tela transpirable y elástica que facilita la movilidad y mantiene la piel seca durante el entrenamiento. Diseño moderno y colores llamativos, ideal para actividades como running, gimnasio o yoga.",
    price: 40.0,
    category: "clothing",
  },
  {
    id: 6,
    title: "Mouse gamer",
    image: "https://placehold.co/400",
    description:
      "Ratón de alta precisión diseñado para gamers, con sensor óptico ajustable hasta 16000 DPI, iluminación RGB personalizable y múltiples botones programables para macros y comandos rápidos. Su diseño ergonómico garantiza comodidad durante largas sesiones de juego.",
    price: 35.99,
    category: "electronics",
  },
  {
    id: 7,
    title: "Camiseta básica",
    image: "https://placehold.co/400",
    description:
      "Camiseta de algodón 100% suave y transpirable, con un corte clásico que se adapta cómodamente al cuerpo. Perfecta para uso diario, combina fácilmente con jeans, pantalones deportivos o shorts, y está disponible en varios colores neutros para combinar con cualquier estilo.",
    price: 12.99,
    category: "clothing",
  },
  {
    id: 8,
    title: "Billetera delgada",
    image: "https://placehold.co/400",
    description:
      "Billetera minimalista y compacta fabricada con cuero sintético resistente al desgaste, diseñada para guardar tarjetas, billetes y documentos esenciales sin añadir volumen innecesario al bolsillo. Ideal para quienes buscan funcionalidad y estilo en un accesorio discreto.",
    price: 18.0,
    category: "accessories",
  },
  {
    id: 9,
    title: "Gorro de lana",
    image: "https://placehold.co/400",
    description:
      "Gorro cálido tejido en lana acrílica de alta calidad, suave al tacto y resistente, ideal para protegerse del frío en climas invernales. Diseño clásico y unisex que se adapta cómodamente a diferentes tamaños de cabeza, disponible en colores sobrios y fáciles de combinar.",
    price: 12.0,
    category: "accessories",
  },
  {
    id: 10,
    title: "SSD externo 1TB",
    image: "https://placehold.co/400",
    description:
      "Unidad de almacenamiento portátil SSD con capacidad de 1TB, velocidad de transferencia ultra rápida gracias a la conexión USB 3.1, diseño compacto y resistente a golpes para proteger tus datos en movilidad. Compatible con múltiples sistemas operativos y perfecto para respaldar archivos importantes.",
    price: 150.0,
    category: "electronics",
  },
  {
    id: 11,
    title: "Vestido casual",
    image: "https://placehold.co/400",
    description:
      "Vestido de verano confeccionado en tela ligera y fresca con estampado floral vibrante, corte suelto y cintura ajustable para mayor comodidad. Perfecto para días calurosos, eventos casuales o paseos, combina estilo y comodidad en una sola prenda.",
    price: 24.5,
    category: "clothing",
  },
  {
    id: 12,
    title: "Camisa polo",
    image: "https://placehold.co/400",
    description:
      "Camisa polo clásica con cuello y botones, fabricada en algodón suave y transpirable que mantiene la frescura durante todo el día. Ideal para uso casual o semi-formal, disponible en varios colores sobrios y con acabado de alta calidad que garantiza durabilidad.",
    price: 22.0,
    category: "clothing",
  },
  {
    id: 13,
    title: "Laptop Ultrabook",
    image: "https://placehold.co/400",
    description:
      "Portátil ultradelgado con procesador Intel i7 de última generación, disco SSD de 512GB para arranque y acceso rápido a archivos, pantalla Full HD de 14 pulgadas con acabado antirreflejo, batería de larga duración y diseño ligero para facilitar la movilidad y productividad en cualquier lugar.",
    price: 1200.0,
    category: "electronics",
  },
  {
    id: 14,
    title: "Reloj analógico",
    image: "https://placehold.co/400",
    description:
      "Reloj de pulsera clásico con caja de acero inoxidable, esfera minimalista con números legibles y correa de cuero genuino que ofrece comodidad y elegancia. Resistente al agua y con mecanismo de cuarzo para precisión y durabilidad en el uso diario.",
    price: 60.0,
    category: "accessories",
  },
  {
    id: 15,
    title: "Auriculares inalámbricos",
    image: "https://placehold.co/400",
    description:
      "Auriculares inalámbricos con tecnología Bluetooth 5.0, cancelación activa de ruido para una experiencia auditiva inmersiva, batería con hasta 8 horas de reproducción continua y estuche portátil que permite recargas adicionales. Diseño ergonómico que se ajusta cómodamente a la oreja.",
    price: 89.99,
    category: "electronics",
  },
  {
    id: 16,
    title: "Sudadera clásica",
    image: "https://placehold.co/400",
    description:
      "Sudadera de felpa suave con bolsillo frontal tipo canguro, capucha ajustable con cordones y puños elásticos para mantener el calor corporal. Ideal para clima fresco y uso diario casual, disponible en varios colores básicos que combinan con cualquier outfit.",
    price: 29.99,
    category: "clothing",
  },
  {
    id: 17,
    title: "Smartphone X100",
    image: "https://placehold.co/400",
    description:
      "Teléfono inteligente de última generación con pantalla OLED de 6.5 pulgadas, cámara trasera cuádruple de alta resolución para fotos y videos profesionales, procesador potente para multitarea fluida, batería de larga duración y carga rápida. Compatible con 5G y funciones avanzadas de seguridad.",
    price: 699.0,
    category: "electronics",
  },
  {
    id: 18,
    title: "Shorts de mezclilla",
    image: "https://placehold.co/400",
    description:
      "Shorts de mezclilla azul con acabado deshilachado en los bordes para un estilo casual y moderno. Confeccionados en tela resistente con un toque de elasticidad, cuentan con bolsillos funcionales y cierre de botón, ideales para días cálidos y looks relajados.",
    price: 18.75,
    category: "clothing",
  },
  {
    id: 19,
    title: "Aretes de plata",
    image: "https://placehold.co/400",
    description:
      "Aretes de plata esterlina con diseño elegante y delicado, ideales para ocasiones especiales o uso diario. Acabado pulido que resalta su brillo natural y cierre seguro que garantiza comodidad y protección durante todo el día.",
    price: 22.75,
    category: "accessories",
  },
  {
    id: 20,
    title: "Zapatillas deportivas",
    image: "https://placehold.co/400",
    description:
      "Zapatillas deportivas ligeras diseñadas para brindar soporte y amortiguación durante actividades físicas intensas. Suela antideslizante, materiales transpirables y ajuste ergonómico que asegura comodidad y rendimiento óptimo tanto en entrenamiento como en uso casual.",
    price: 45.0,
    category: "clothing",
  },
  {
    id: 21,
    title: "Cinturón de cuero",
    image: "https://placehold.co/400",
    description:
      "Cinturón de cuero genuino con hebilla metálica resistente y acabado pulido. Diseño clásico que combina con pantalones formales o casuales, duradero y flexible para uso diario y ocasiones especiales.",
    price: 15.99,
    category: "accessories",
  },
  {
    id: 22,
    title: "Mochila de viaje",
    image: "https://placehold.co/400",
    description:
      "Mochila resistente y espaciosa con múltiples compartimentos organizadores, fabricada con materiales impermeables y duraderos. Ideal para viajes, excursiones o uso diario, cuenta con correas acolchadas para mayor comodidad y soporte ergonómico.",
    price: 45.99,
    category: "accessories",
  },
  {
    id: 23,
    title: "Smartwatch Pro",
    image: "https://placehold.co/400",
    description:
      "Reloj inteligente avanzado con GPS integrado, monitor de frecuencia cardíaca, seguimiento de actividad física y notificaciones de smartphone. Pantalla táctil a color, batería de larga duración y diseño moderno resistente al agua para uso diario y deportivo.",
    price: 199.99,
    category: "electronics",
  },
  {
    id: 24,
    title: "Bufanda de invierno",
    image: "https://placehold.co/400",
    description:
      "Bufanda suave y abrigadora fabricada en mezcla de lana y acrílico, perfecta para protegerse del frío intenso durante el invierno. Diseño clásico y colores neutros que combinan fácilmente con cualquier abrigo o chaqueta.",
    price: 14.5,
    category: "accessories",
  },
  {
    id: 25,
    title: "Gorra tipo béisbol",
    image: "https://placehold.co/400",
    description:
      "Gorra ajustable estilo béisbol con visera curva, fabricada en algodón resistente y transpirable. Diseño casual ideal para protección solar en actividades al aire libre o para complementar un look deportivo.",
    price: 10.99,
    category: "accessories",
  },
  {
    id: 26,
    title: "Chaqueta impermeable",
    image: "https://placehold.co/400",
    description:
      "Chaqueta ligera y resistente al agua, confeccionada con tela técnica impermeable y transpirable que mantiene seco y cómodo en condiciones climáticas adversas. Cuenta con capucha ajustable, cierres sellados y bolsillos con cremallera para mayor funcionalidad.",
    price: 59.99,
    category: "clothing",
  },
  {
    id: 27,
    title: "Gafas de sol polarizadas",
    image: "https://placehold.co/400",
    description:
      "Gafas de sol con lentes polarizadas que reducen el deslumbramiento y ofrecen protección UV400 contra los rayos solares nocivos. Montura ligera y resistente, diseño moderno y cómodo para uso prolongado en exteriores.",
    price: 25.5,
    category: "accessories",
  },
  {
    id: 28,
    title: "Teclado mecánico",
    image: "https://placehold.co/400",
    description:
      "Teclado mecánico con switches táctiles y retroiluminación RGB personalizable, ideal para gamers y escritores. Construcción robusta con teclas duraderas y respuesta rápida, diseño ergonómico para sesiones largas y cómodo manejo multimedia.",
    price: 79.5,
    category: "electronics",
  },
  {
    id: 29,
    title: "Altavoz Bluetooth",
    image: "https://placehold.co/400",
    description:
      "Altavoz portátil con conexión Bluetooth que ofrece sonido potente y claro, batería recargable con hasta 10 horas de reproducción continua, diseño compacto resistente al agua y controles intuitivos para facilitar su uso en interiores y exteriores.",
    price: 55.0,
    category: "electronics",
  },
  {
    id: 30,
    title: "Suéter de punto",
    image: "https://placehold.co/400",
    description:
      "Suéter cálido confeccionado en punto grueso de alta calidad, ideal para mantener el calor en temporadas frías. Diseño clásico con cuello redondo y ajuste cómodo que permite combinarlo con diferentes prendas para un look casual o formal.",
    price: 31.2,
    category: "clothing",
  },
];

export default products;
