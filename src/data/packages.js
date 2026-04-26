export const packages = [
  {
    id: 1,
    title: "MATHERAN & PEBFORT TREK",
    location: "Maharashtra, India",
    price: 3999,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?auto=format&fit=crop&q=80&w=1000",
    category: "Trekking",
    details: {
      months: [
        { name: "JUNE", dates: ["25-28"] },
        { name: "JULY", dates: ["02-05", "09-12", "16-19", "23-26", "30-Aug 02"] },
        { name: "AUGUST", dates: ["06-09", "13-16", "20-23", "27-30"] },
        { name: "SEPTEMBER", dates: ["03-06", "10-13", "17-20", "24-27"] }
      ],
      inclusions: [
        "Up & Down Train Tickets",
        "Transportation",
        "Entry Tickets",
        "Meals",
        "Premium Pool Resort Stay",
        "Toy Train Ticket",
        "Sightseeing",
        "Malayali Tour Guide"
      ]
    },
    comments: [
      { id: 1, user: "Abhijith", text: "Amazing experience! The resort stay was fantastic.", rating: 5 },
      { id: 2, user: "Saira", text: "Difficult trek but worth it for the views.", rating: 4 }
    ]
  },
  {
    id: 2,
    title: "LUXURY BEACH ESCAPE",
    location: "Varkala, Kerala",
    price: 5499,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=1000",
    category: "Beach",
    details: {
      months: [
        { name: "OCTOBER", dates: ["12-15", "19-22"] },
        { name: "NOVEMBER", dates: ["05-08", "15-18", "25-28"] }
      ],
      inclusions: [
        "Private Beach Access",
        "Luxury Suite",
        "Surfing Lessons",
        "Seafood Platter",
        "Yoga Sessions"
      ]
    },
    comments: [
      { id: 1, user: "Rahul", text: "The most relaxing trip I've ever had.", rating: 5 }
    ]
  }
];

export const stays = [
  {
    id: 101,
    title: "Minimalist Forest Cabin",
    location: "Wayanad, Kerala",
    price: 2500,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1449156001935-cf2d4099911b?auto=format&fit=crop&q=80&w=1000",
    category: "Nature",
    description: "A peaceful retreat deep in the forest. Perfect for digital nomads and writers."
  },
  {
    id: 102,
    title: "Heritage Stone House",
    location: "Hampi, Karnataka",
    price: 1800,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1000",
    category: "Heritage",
    description: "Live like a local in this beautifully restored 100-year-old stone house."
  }
];

export const connections = [
  {
    id: 201,
    title: "Weekend Hiking Group",
    location: "Bangalore, India",
    date: "Every Saturday",
    participants: 12,
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=1000",
    description: "Join our community of local hikers for weekly trail explorations."
  },
  {
    id: 202,
    title: "Backpacker Meetup",
    location: "Goa, India",
    date: "May 15, 2024",
    participants: 45,
    image: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&q=80&w=1000",
    description: "Offline gathering for solo travelers to share stories and tips."
  }
];

export const videos = [
  {
    id: "QGVil14-WGU",
    title: "Meesapulimala Monsoon Trek",
    thumbnail: "https://img.youtube.com/vi/QGVil14-WGU/maxresdefault.jpg",
    description: "Lost in the Clouds of Munnar | To see the snow falling in Meesapu..."
  },
  {
    id: "th_sTniue-c",
    title: "Munnar Gap Road Trekking",
    thumbnail: "https://img.youtube.com/vi/th_sTniue-c/maxresdefault.jpg",
    description: "Kolukkumalai Jeep Trekking Suryanelli | Scenary Route Off-road"
  },
  {
    id: "QbXc1S3IEPE",
    title: "Route to Nelliyampathy, Palakkad",
    thumbnail: "https://img.youtube.com/vi/QbXc1S3IEPE/maxresdefault.jpg",
    description: "പാലക്കാടിന്റെ സുന്ദരിയെ തേടി | Forest Route, A Cinematic Vlog"
  },
  {
    id: "q0w42xxWs6w",
    title: "Mamalakandam Monsoon Ride",
    thumbnail: "https://img.youtube.com/vi/q0w42xxWs6w/maxresdefault.jpg",
    description: "A Scenery Forest Route in Ernakulam | Don't miss this route"
  }
];
