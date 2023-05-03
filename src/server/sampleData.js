// sampleData.js


module.exports = {
    categories: [
        {
          id: "1",
          name: "Bebidas",
          image: "https://cdn.uey.mx/uploads/category-cerveza.svg",
        },
        {
          id: "2",
          name: "Rentables",
          image: "https://cdn.uey.mx/uploads/category-mobiliario.svg",
        },
        {
          id: "3",
          name: "Espacios",
          image: "https://cdn.uey.mx/uploads/category-familiares.svg",
        },
        {
          id: "4",
          name: "Musica",
          image: "https://cdn.uey.mx/uploads/category-djs.svg"
        },
        {
            id: "5",
            name: "Shows",
            image: "https://cdn.uey.mx/uploads/category-shows.svg"
          },
          {
            id: "6",
            name: "Toldos y Carpas",
            image: "https://cdn.uey.mx/uploads/category-toldos-y-ambientales.svg"
          },
          {
            id: "7",
            name: "Iluminacion ",
            image: "https://cdn.uey.mx/uploads/category-iluminacion-y-produccion.svg"
          },
      ],
      
      products: [
        // Ejemplo de datos, en una implementación real estos datos provendrían de una base de datos
        {
          id: "1",
          name: "Coca-Cola",
          category: "1",
          vendor: "Coca-Cola Company",
          image: "https://www.giorgiogastro.com.br/ipatinga/wp-content/uploads/2018/09/coca-cola.jpg",
          price: 15,
          type: "SimpleProduct",
          inventory: 100,
          featured: false,
          newarrivals: false,
        },
        {
          id: "2",
          name: "Equipo DJ + Pista Infinity Gold",
          category: "5",
          vendor: "Pancho producciones",
          image: "https://cdn.uey.mx/uploads/VerbenaEvento-Paquete-plus-1-1.jpg.webp",
          price: 18,
          type: "SimpleProduct",
          inventory: 300,
          featured: false,
          newarrivals: false,
        },
        {
          id: "3",
          name: "Mesa redonda",
          category: "2",
          vendor: "Uey Rentals",
          image: "https://cdn.uey.mx/uploads/sala-lounge-blanca-completo-1-2-1.png.webp",
          price: 200,
          type: "RentableProduct",
          rentalType: "noche",
          availability: ["2023-04-01", "2023-04-03", "2023-04-05"],
          featured: false,
          newarrivals: true,
        },
        {
          id: "4",
          name: "Salón de eventos",
          category: "3",
          vendor: "Eventos Uey",
          image: "https://cdn.uey.mx/uploads/Avanta-Gardens.jpg.webp",
          price: 5000,
          type: "SpaceProduct",
          location: {
            lat: 19.4326077,
            lng: -99.13320799999997,
          },
          availability: ["2023-04-10", "2023-04-15", "2023-04-20"],
          featured: true,
          newarrivals: true,
        },
        {
          id: "5",
          name: "Equipo de Sonido Profesional",
          category: "4",
          vendor: "Eventos Uey",
          image: "https://cdn.uey.mx/uploads/Paquete-Plus-con-Pista-Colors.jpg.webp",
          price: 5000,
          type: "SpaceProduct",
          
          availability: ["2023-04-10", "2023-04-15", "2023-04-20"],
          featured: false,
          newarrivals: true,
        },
        {
        id: "6",
          name: "Toldo 6×12",
          category: "6",
          vendor: "Eventos Uey",
          image: "https://cdn.uey.mx/uploads/Toldo_1.jpg.webp",
          price: 5000,
          type: "SpaceProduct",
         
          availability: ["2023-04-10", "2023-04-15", "2023-04-20"],
          featured: true,
          newarrivals: true,
        },
        {
        id: "7",
          name: "Esfera Disco sin motor",
          category: "7",
          vendor: "Eventos Uey",
          image: "https://cdn.uey.mx/uploads/RaulM-Esfera-disco-con-motor-2.png",
          price: 5000,
          type: "SpaceProduct",
         
          availability: ["2023-04-10", "2023-04-15", "2023-04-20"],
          featured: true,
          newarrivals: false,
        },
        {
        id: "8",
          name: "Maquina de Humo",
          category: "7",
          vendor: "Eventos Uey",
          image: "https://cdn.uey.mx/uploads/RaulM-Maquina-de-humo-1-250x250.png.webp",
          price: 1300,
          type: "SpaceProduct",
         
          availability: ["2023-04-10", "2023-04-15", "2023-04-20"],
          featured: true,
          newarrivals: false,
        },
        {
            id: "9",
              name: "Par LED para interior",
              category: "7",
              vendor: "Eventos Uey",
              image: "https://cdn.uey.mx/uploads/par-led-luz-negra-para-exterior.png",
              price: 1300,
              type: "SpaceProduct",
             
              availability: ["2023-04-10", "2023-04-15", "2023-04-20"],
              featured: true,
              newarrivals: false,
            },
            {
                id: "10",
                name: "Paquete plus con Pinsta Infinity Gold",
                category: "4",
                vendor: "Eventos Uey",
                image: "https://cdn.uey.mx/uploads/Paquete-Plus-con-Pista-Infinity-Gold.jpg.webp",
                price: 5000,
                type: "SpaceProduct",
               
                availability: ["2023-04-10", "2023-04-15", "2023-04-20"],
                featured: false,
                newarrivals: true,
              },
      ]
      
  };
  