import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MapView from './components/MapView';
import FilterPanel from './components/FilterPanel';
import RoomCard from './components/RoomCard';
import RoomDetailModal from './components/RoomDetailModal';
import SearchBar from './components/SearchBar';
import PopularRoomsSection from './components/PopularRoomsSection';

const RoomExplorerDiscovery = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('grid');
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [favoriteRooms, setFavoriteRooms] = useState(new Set());
  const [sortBy, setSortBy] = useState('popularity');

  // Mock data for buildings
  const buildings = [
    {
      id: 'main-academic',
      name: 'Main Academic Building',
      code: 'MAB',
      description: 'Primary academic facility with lecture halls and seminar rooms',
      availableRooms: 23,
      totalCapacity: 450,
      mapPosition: { x: 45, y: 35 }
    },
    {
      id: 'science-complex',
      name: 'Science Complex',
      code: 'SC',
      description: 'Modern science facilities with labs and research spaces',
      availableRooms: 18,
      totalCapacity: 320,
      mapPosition: { x: 65, y: 45 }
    },
    {
      id: 'library-building',
      name: 'Library Building',
      code: 'LIB',
      description: 'Quiet study spaces and collaborative learning areas',
      availableRooms: 31,
      totalCapacity: 280,
      mapPosition: { x: 35, y: 55 }
    },
    {
      id: 'student-center',
      name: 'Student Center',
      code: 'SC',
      description: 'Social and recreational spaces for student activities',
      availableRooms: 15,
      totalCapacity: 200,
      mapPosition: { x: 55, y: 65 }
    }
  ];

  // Mock data for rooms
  const allRooms = [
    {
      id: 'room-001',
      name: 'Innovation Lab A',
      building: 'Main Academic Building',
      floor: 3,
      roomNumber: '301A',
      type: 'Collaborative Space',
      capacity: 12,
      rating: 4.8,
      reviewCount: 127,
      popularityScore: 94,
      averageBookingDuration: 2.5,
      availability: 'available',
      nextAvailable: 'Now',
      availableDuration: '3 hours',
      isFavorite: false,
      hasVirtualTour: true,
      images: [
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop'
      ],
      amenities: ['High-Speed WiFi', 'Interactive Whiteboard', 'Projector', 'Power Outlets'],
      keyAmenities: ['WiFi', 'Whiteboard', 'Projector'],
      description: `A modern collaborative workspace designed for team projects and interactive learning. Features state-of-the-art technology including interactive whiteboards, wireless presentation capabilities, and flexible furniture arrangements. Perfect for group work, brainstorming sessions, and small presentations.`,
      detailedAmenities: {
        technology: [
          { name: 'High-Speed WiFi', description: '1Gbps fiber connection', icon: 'Wifi' },
          { name: 'Interactive Whiteboard', description: '75" touch display', icon: 'Monitor' },
          { name: 'Wireless Projector', description: '4K resolution, wireless casting', icon: 'Cast' },
          { name: 'Video Conferencing', description: 'Zoom Rooms equipped', icon: 'Video' }
        ],
        furniture: [
          { name: 'Modular Tables', description: 'Configurable for different group sizes', icon: 'Square' },
          { name: 'Ergonomic Chairs', description: 'Adjustable height and support', icon: 'Armchair' },
          { name: 'Mobile Whiteboards', description: 'Additional writing surfaces', icon: 'PenTool' }
        ],
        environment: [
          { name: 'Natural Light', description: 'Large windows with city view', icon: 'Sun' },
          { name: 'Climate Control', description: 'Individual room temperature control', icon: 'Wind' },
          { name: 'Sound Insulation', description: 'Acoustic panels for privacy', icon: 'Volume' }
        ]
      },
      recentReview: {
        author: 'Sarah Chen',
        avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
        date: '2 days ago',
        comment: 'Perfect space for our capstone project meetings. The interactive whiteboard made our presentations so much better!'
      },
      reviews: [
        {
          id: 1,
          author: 'Sarah Chen',
          avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
          date: '2 days ago',
          rating: 5,
          comment: 'Perfect space for our capstone project meetings. The interactive whiteboard made our presentations so much better!',
          helpfulCount: 12,
          images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=150&fit=crop']
        },
        {
          id: 2,
          author: 'Michael Rodriguez',
          avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
          date: '1 week ago',
          rating: 5,
          comment: 'Great lighting and comfortable seating. The wireless presentation setup worked flawlessly.',
          helpfulCount: 8
        }
      ],
      ratingDistribution: { 5: 78, 4: 18, 3: 3, 2: 1, 1: 0 },
      todaySchedule: [
        { time: '9:00 AM - 10:30 AM', status: 'available' },
        { time: '10:30 AM - 12:00 PM', status: 'booked', bookedBy: 'CS 401 Team' },
        { time: '12:00 PM - 1:30 PM', status: 'available' },
        { time: '1:30 PM - 3:00 PM', status: 'available' },
        { time: '3:00 PM - 4:30 PM', status: 'booked', bookedBy: 'Design Workshop' },
        { time: '4:30 PM - 6:00 PM', status: 'available' }
      ],
      weeklyPattern: [85, 92, 88, 90, 87, 45, 32]
    },
    {
      id: 'room-002',
      name: 'Silent Study Pod 1',
      building: 'Library Building',
      floor: 2,
      roomNumber: '201',
      type: 'Silent Study',
      capacity: 4,
      rating: 4.6,
      reviewCount: 89,
      popularityScore: 87,
      averageBookingDuration: 3.2,
      availability: 'busy',
      nextAvailable: 'In 45 minutes',
      availableDuration: '2 hours',
      isFavorite: true,
      hasVirtualTour: false,
      images: [
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop'
      ],
      amenities: ['Ultra-Quiet Environment', 'Individual Desks', 'Power Outlets', 'Task Lighting'],
      keyAmenities: ['Quiet', 'Individual Desks', 'Lighting'],
      description: `A dedicated silent study space designed for focused individual work. Features sound-dampening materials, individual study carrels with task lighting, and a strictly enforced quiet policy. Ideal for exam preparation, research, and deep focus work.`,
      detailedAmenities: {
        technology: [
          { name: 'Power Outlets', description: 'USB-C and standard outlets at each desk', icon: 'Zap' },
          { name: 'WiFi Access', description: 'High-speed internet connection', icon: 'Wifi' }
        ],
        furniture: [
          { name: 'Individual Study Carrels', description: 'Private workspace with dividers', icon: 'Square' },
          { name: 'Ergonomic Chairs', description: 'Comfortable seating for long study sessions', icon: 'Armchair' },
          { name: 'Storage Cubbies', description: 'Personal item storage', icon: 'Archive' }
        ],
        environment: [
          { name: 'Sound Dampening', description: 'Acoustic panels and carpet', icon: 'Volume' },
          { name: 'Task Lighting', description: 'Adjustable LED desk lamps', icon: 'Lightbulb' },
          { name: 'Temperature Control', description: 'Quiet HVAC system', icon: 'Wind' }
        ]
      },
      recentReview: {
        author: 'David Kim',
        avatar: 'https://randomuser.me/api/portraits/men/28.jpg',
        date: '5 days ago',
        comment: 'Perfect for finals prep. So quiet you can hear a pin drop!'
      },
      reviews: [
        {
          id: 1,
          author: 'David Kim',
          avatar: 'https://randomuser.me/api/portraits/men/28.jpg',
          date: '5 days ago',
          rating: 5,
          comment: 'Perfect for finals prep. So quiet you can hear a pin drop!',
          helpfulCount: 15
        }
      ],
      ratingDistribution: { 5: 65, 4: 25, 3: 8, 2: 2, 1: 0 },
      todaySchedule: [
        { time: '8:00 AM - 10:00 AM', status: 'booked', bookedBy: 'Emma Watson' },
        { time: '10:00 AM - 12:00 PM', status: 'available' },
        { time: '12:00 PM - 2:00 PM', status: 'booked', bookedBy: 'John Smith' },
        { time: '2:00 PM - 4:00 PM', status: 'available' },
        { time: '4:00 PM - 6:00 PM', status: 'available' }
      ],
      weeklyPattern: [78, 85, 82, 88, 92, 65, 45]
    },
    {
      id: 'room-003',
      name: 'Presentation Theater B',
      building: 'Science Complex',
      floor: 1,
      roomNumber: '105B',
      type: 'Presentation Room',
      capacity: 45,
      rating: 4.7,
      reviewCount: 156,
      popularityScore: 91,
      averageBookingDuration: 1.8,
      availability: 'available',
      nextAvailable: 'Now',
      availableDuration: '4 hours',
      isFavorite: false,
      hasVirtualTour: true,
      images: [
        'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1571624436279-b272aff752b5?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop'
      ],
      amenities: ['4K Projector', 'Surround Sound', 'Tiered Seating', 'Presentation Remote'],
      keyAmenities: ['4K Projector', 'Sound System', 'Tiered Seating'],
      description: `A professional presentation theater with tiered seating and state-of-the-art audiovisual equipment. Perfect for lectures, seminars, and formal presentations. Features include 4K projection, wireless presentation capabilities, and professional lighting controls.`,
      detailedAmenities: {
        technology: [
          { name: '4K Laser Projector', description: '120" screen, ultra-bright display', icon: 'Monitor' },
          { name: 'Surround Sound System', description: '7.1 channel audio with wireless mics', icon: 'Volume2' },
          { name: 'Wireless Presentation', description: 'AirPlay, Chromecast, and HDMI', icon: 'Cast' },
          { name: 'Recording Equipment', description: 'Built-in lecture capture system', icon: 'Video' }
        ],
        furniture: [
          { name: 'Tiered Seating', description: '45 cushioned seats with fold-down desks', icon: 'Armchair' },
          { name: 'Presenter Podium', description: 'Height-adjustable with controls', icon: 'Square' }
        ],
        environment: [
          { name: 'Professional Lighting', description: 'Dimmable LED system', icon: 'Lightbulb' },
          { name: 'Climate Control', description: 'Quiet ventilation system', icon: 'Wind' },
          { name: 'Acoustic Design', description: 'Optimized for clear audio', icon: 'Volume' }
        ]
      },
      recentReview: {
        author: 'Prof. Anderson',
        avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
        date: '3 days ago',
        comment: 'Excellent facility for guest lectures. The AV equipment is top-notch and easy to use.'
      },
      reviews: [
        {
          id: 1,
          author: 'Prof. Anderson',
          avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
          date: '3 days ago',
          rating: 5,
          comment: 'Excellent facility for guest lectures. The AV equipment is top-notch and easy to use.',
          helpfulCount: 23
        }
      ],
      ratingDistribution: { 5: 72, 4: 22, 3: 4, 2: 2, 1: 0 },
      todaySchedule: [
        { time: '9:00 AM - 10:30 AM', status: 'available' },
        { time: '10:30 AM - 12:00 PM', status: 'available' },
        { time: '12:00 PM - 1:30 PM', status: 'booked', bookedBy: 'Guest Lecture Series' },
        { time: '1:30 PM - 3:00 PM', status: 'available' },
        { time: '3:00 PM - 4:30 PM', status: 'available' }
      ],
      weeklyPattern: [88, 92, 85, 90, 87, 55, 35]
    },
    {
      id: 'room-004',
      name: 'Computer Lab Alpha',
      building: 'Science Complex',
      floor: 2,
      roomNumber: '205',
      type: 'Computer Lab',
      capacity: 24,
      rating: 4.4,
      reviewCount: 203,
      popularityScore: 83,
      averageBookingDuration: 2.1,
      availability: 'occupied',
      nextAvailable: 'In 2 hours',
      availableDuration: '3 hours',
      isFavorite: false,
      hasVirtualTour: false,
      images: [
        'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop'
      ],
      amenities: ['High-Performance PCs', 'Dual Monitors', 'Software Suite', 'Printing Station'],
      keyAmenities: ['High-Performance PCs', 'Dual Monitors', 'Software'],
      description: `A fully equipped computer laboratory with high-performance workstations for programming, design, and research work. Each station features dual monitors, latest software suites, and high-speed internet connectivity. Perfect for coding bootcamps, design workshops, and computational research.`,
      detailedAmenities: {
        technology: [
          { name: 'High-Performance Workstations', description: 'Intel i7, 32GB RAM, RTX graphics', icon: 'Monitor' },
          { name: 'Dual 27" Monitors', description: '4K displays with color accuracy', icon: 'Monitor' },
          { name: 'Software Suite', description: 'Adobe Creative, Visual Studio, MATLAB', icon: 'Code' },
          { name: 'High-Speed Network', description: '10Gbps connection per workstation', icon: 'Wifi' }
        ],
        furniture: [
          { name: 'Ergonomic Workstations', description: 'Adjustable height desks', icon: 'Square' },
          { name: 'Professional Chairs', description: 'Herman Miller task chairs', icon: 'Armchair' }
        ],
        environment: [
          { name: 'Server Room Cooling', description: 'Precision temperature control', icon: 'Wind' },
          { name: 'LED Lighting', description: 'Flicker-free, eye-friendly illumination', icon: 'Lightbulb' },
          { name: 'Cable Management', description: 'Clean, organized workspace', icon: 'Settings' }
        ]
      },
      recentReview: {
        author: 'Alex Thompson',
        avatar: 'https://randomuser.me/api/portraits/men/34.jpg',
        date: '1 week ago',
        comment: 'Great setup for our machine learning project. The GPUs made training so much faster!'
      },
      reviews: [
        {
          id: 1,
          author: 'Alex Thompson',
          avatar: 'https://randomuser.me/api/portraits/men/34.jpg',
          date: '1 week ago',
          rating: 4,
          comment: 'Great setup for our machine learning project. The GPUs made training so much faster!',
          helpfulCount: 18
        }
      ],
      ratingDistribution: { 5: 58, 4: 28, 3: 10, 2: 3, 1: 1 },
      todaySchedule: [
        { time: '8:00 AM - 10:00 AM', status: 'booked', bookedBy: 'CS 301 Lab' },
        { time: '10:00 AM - 12:00 PM', status: 'booked', bookedBy: 'Data Science Workshop' },
        { time: '12:00 PM - 2:00 PM', status: 'available' },
        { time: '2:00 PM - 4:00 PM', status: 'available' },
        { time: '4:00 PM - 6:00 PM', status: 'booked', bookedBy: 'Programming Bootcamp' }
      ],
      weeklyPattern: [92, 88, 85, 90, 87, 45, 25]
    },
    {
      id: 'room-005',
      name: 'Creative Workshop Space',
      building: 'Student Center',
      floor: 1,
      roomNumber: '110',
      type: 'Workshop Space',
      capacity: 16,
      rating: 4.9,
      reviewCount: 94,
      popularityScore: 89,
      averageBookingDuration: 3.5,
      availability: 'available',
      nextAvailable: 'Now',
      availableDuration: '5 hours',
      isFavorite: true,
      hasVirtualTour: true,
      images: [
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop'
      ],
      amenities: ['Flexible Furniture', 'Art Supplies', 'Maker Tools', 'Large Whiteboards'],
      keyAmenities: ['Flexible Setup', 'Art Supplies', 'Maker Tools'],
      description: `A versatile creative space designed for hands-on workshops, art projects, and maker activities. Features moveable furniture, abundant storage for supplies, and tools for various creative endeavors. Perfect for design thinking sessions, art workshops, and prototype development.`,
      detailedAmenities: {
        technology: [
          { name: '3D Printer', description: 'Professional grade FDM printer', icon: 'Box' },
          { name: 'Digital Drawing Tablets', description: 'Wacom professional tablets', icon: 'PenTool' },
          { name: 'Document Camera', description: 'For sharing physical work', icon: 'Camera' }
        ],
        furniture: [
          { name: 'Modular Tables', description: 'Configurable for any project size', icon: 'Square' },
          { name: 'Mobile Storage', description: 'Rolling carts with supplies', icon: 'Archive' },
          { name: 'Standing Workbenches', description: 'For hands-on projects', icon: 'Wrench' }
        ],
        environment: [
          { name: 'Natural Light', description: 'Large windows and skylights', icon: 'Sun' },
          { name: 'Ventilation System', description: 'For art materials and adhesives', icon: 'Wind' },
          { name: 'Easy-Clean Surfaces', description: 'Designed for messy projects', icon: 'Droplets' }
        ]
      },
      recentReview: {
        author: 'Maria Garcia',
        avatar: 'https://randomuser.me/api/portraits/women/42.jpg',
        date: '4 days ago',
        comment: 'Amazing space for our design thinking workshop! The flexible setup allowed us to reconfigure for different activities.'
      },
      reviews: [
        {
          id: 1,
          author: 'Maria Garcia',
          avatar: 'https://randomuser.me/api/portraits/women/42.jpg',
          date: '4 days ago',
          rating: 5,
          comment: 'Amazing space for our design thinking workshop! The flexible setup allowed us to reconfigure for different activities.',
          helpfulCount: 21
        }
      ],
      ratingDistribution: { 5: 85, 4: 12, 3: 2, 2: 1, 1: 0 },
      todaySchedule: [
        { time: '9:00 AM - 12:00 PM', status: 'available' },
        { time: '12:00 PM - 2:00 PM', status: 'available' },
        { time: '2:00 PM - 5:00 PM', status: 'booked', bookedBy: 'Art Club Workshop' },
        { time: '5:00 PM - 7:00 PM', status: 'available' }
      ],
      weeklyPattern: [75, 82, 88, 85, 90, 65, 45]
    },
    {
      id: 'room-006',
      name: 'Group Study Room C',
      building: 'Library Building',
      floor: 3,
      roomNumber: '315C',
      type: 'Collaborative Space',
      capacity: 8,
      rating: 4.5,
      reviewCount: 167,
      popularityScore: 86,
      averageBookingDuration: 2.8,
      availability: 'available',
      nextAvailable: 'Now',
      availableDuration: '6 hours',
      isFavorite: false,
      hasVirtualTour: false,
      images: [
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop'
      ],
      amenities: ['Round Table', 'Whiteboard', 'Power Outlets', 'Comfortable Seating'],
      keyAmenities: ['Round Table', 'Whiteboard', 'Comfortable'],
      description: `A cozy group study room perfect for small team collaborations and study groups. Features a large round table that encourages equal participation, a full-wall whiteboard for brainstorming, and comfortable seating for extended sessions.`,
      detailedAmenities: {
        technology: [
          { name: 'WiFi Access', description: 'High-speed internet connection', icon: 'Wifi' },
          { name: 'Power Outlets', description: 'Multiple outlets around the table', icon: 'Zap' },
          { name: 'USB Charging Ports', description: 'Built into the table', icon: 'Smartphone' }
        ],
        furniture: [
          { name: 'Round Conference Table', description: 'Seats 8 comfortably', icon: 'Circle' },
          { name: 'Ergonomic Chairs', description: 'Adjustable office chairs', icon: 'Armchair' },
          { name: 'Storage Cabinet', description: 'For personal belongings', icon: 'Archive' }
        ],
        environment: [
          { name: 'Full-Wall Whiteboard', description: 'Magnetic dry-erase surface', icon: 'PenTool' },
          { name: 'Natural Light', description: 'Large window with campus view', icon: 'Sun' },
          { name: 'Sound Insulation', description: 'Quiet environment for discussion', icon: 'Volume' }
        ]
      },
      recentReview: {
        author: 'Jennifer Liu',
        avatar: 'https://randomuser.me/api/portraits/women/25.jpg',
        date: '6 days ago',
        comment: 'Perfect size for our study group. The round table makes everyone feel included in discussions.'
      },
      reviews: [
        {
          id: 1,
          author: 'Jennifer Liu',
          avatar: 'https://randomuser.me/api/portraits/women/25.jpg',
          date: '6 days ago',
          rating: 5,
          comment: 'Perfect size for our study group. The round table makes everyone feel included in discussions.',
          helpfulCount: 14
        }
      ],
      ratingDistribution: { 5: 62, 4: 28, 3: 8, 2: 2, 1: 0 },
      todaySchedule: [
        { time: '8:00 AM - 10:00 AM', status: 'available' },
        { time: '10:00 AM - 12:00 PM', status: 'booked', bookedBy: 'Biology Study Group' },
        { time: '12:00 PM - 2:00 PM', status: 'available' },
        { time: '2:00 PM - 4:00 PM', status: 'available' },
        { time: '4:00 PM - 6:00 PM', status: 'available' }
      ],
      weeklyPattern: [80, 85, 88, 82, 90, 55, 40]
    }
  ];

  const [filteredRooms, setFilteredRooms] = useState(allRooms);
  const [popularRooms] = useState(allRooms.slice(0, 6));

  // Filter and search logic
  useEffect(() => {
    let filtered = [...allRooms];

    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(room =>
        room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.building.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.amenities.some(amenity => 
          amenity.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Apply filters
    if (filters.roomTypes && filters.roomTypes.length > 0) {
      filtered = filtered.filter(room => {
        const roomTypeMap = {
          'silent-study': 'Silent Study',
          'collaborative': 'Collaborative Space',
          'presentation': 'Presentation Room',
          'computer-lab': 'Computer Lab',
          'meeting': 'Meeting Room',
          'workshop': 'Workshop Space'
        };
        return filters.roomTypes.some(type => roomTypeMap[type] === room.type);
      });
    }

    if (filters.capacity) {
      if (filters.capacity.min) {
        filtered = filtered.filter(room => room.capacity >= parseInt(filters.capacity.min));
      }
      if (filters.capacity.max) {
        filtered = filtered.filter(room => room.capacity <= parseInt(filters.capacity.max));
      }
    }

    if (filters.amenities && filters.amenities.length > 0) {
      filtered = filtered.filter(room => {
        const amenityMap = {
          'wifi': 'High-Speed WiFi',
          'projector': 'Projector',
          'whiteboard': 'Whiteboard',
          'outlets': 'Power Outlets',
          'ac': 'Air Conditioning',
          'natural-light': 'Natural Light'
        };
        return filters.amenities.some(amenity => 
          room.amenities.some(roomAmenity => 
            roomAmenity.includes(amenityMap[amenity] || amenity)
          )
        );
      });
    }

    // Apply sorting
    switch (sortBy) {
      case 'popularity':
        filtered.sort((a, b) => b.popularityScore - a.popularityScore);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'capacity':
        filtered.sort((a, b) => b.capacity - a.capacity);
        break;
      case 'availability':
        filtered.sort((a, b) => {
          const availabilityOrder = { 'available': 0, 'busy': 1, 'occupied': 2 };
          return availabilityOrder[a.availability] - availabilityOrder[b.availability];
        });
        break;
      default:
        break;
    }

    setFilteredRooms(filtered);
  }, [searchQuery, filters, sortBy]);

  const handleSearch = (query, quickFilters) => {
    setSearchQuery(query);
    
    // Convert quick filters to main filters format
    const newFilters = { ...filters };
    
    if (quickFilters.availableNow) {
      // Filter for available rooms
      setFilteredRooms(prev => prev.filter(room => room.availability === 'available'));
    }
    
    if (quickFilters.hasProjector) {
      newFilters.amenities = [...(newFilters.amenities || []), 'projector'];
    }
    
    if (quickFilters.quietSpace) {
      newFilters.roomTypes = [...(newFilters.roomTypes || []), 'silent-study'];
    }
    
    if (quickFilters.groupFriendly) {
      newFilters.roomTypes = [...(newFilters.roomTypes || []), 'collaborative'];
    }
    
    setFilters(newFilters);
  };

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
    setShowRoomModal(true);
  };

  const handleFavoriteToggle = (roomId) => {
    const newFavorites = new Set(favoriteRooms);
    if (newFavorites.has(roomId)) {
      newFavorites.delete(roomId);
    } else {
      newFavorites.add(roomId);
    }
    setFavoriteRooms(newFavorites);
    
    // Update room data
    setFilteredRooms(prev => prev.map(room => ({
      ...room,
      isFavorite: room.id === roomId ? !room.isFavorite : room.isFavorite
    })));
  };

  const handleQuickBook = (room, timeSlot = null) => {
    // Navigate to booking interface with room pre-selected
    navigate('/instant-booking-interface', { 
      state: { 
        selectedRoom: room,
        selectedTimeSlot: timeSlot
      }
    });
  };

  const handleBookRoom = (room, timeSlot = null) => {
    handleQuickBook(room, timeSlot);
    setShowRoomModal(false);
  };

  const renderRoomGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredRooms.map((room) => (
        <RoomCard
          key={room.id}
          room={room}
          onRoomSelect={handleRoomSelect}
          onFavoriteToggle={handleFavoriteToggle}
          onQuickBook={handleQuickBook}
        />
      ))}
    </div>
  );

  const renderRoomList = () => (
    <div className="space-y-4">
      {filteredRooms.map((room) => (
        <div key={room.id} className="bg-card rounded-lg border border-border academic-shadow p-4 hover:academic-shadow-lg academic-transition">
          <div className="flex items-start space-x-4">
            <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={room.images[0]}
                alt={room.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-foreground text-lg">{room.name}</h3>
                  <p className="text-sm text-muted-foreground">{room.building} • Floor {room.floor}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={14}
                        className={i < Math.floor(room.rating) ? "text-warning fill-current" : "text-muted-foreground"}
                      />
                    ))}
                    <span className="text-sm text-muted-foreground">({room.reviewCount})</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 mb-3 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={14} />
                  <span>{room.capacity} people</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Tag" size={14} />
                  <span>{room.type}</span>
                </div>
                <div className={`flex items-center space-x-1 ${
                  room.availability === 'available' ? 'text-success' :
                  room.availability === 'busy' ? 'text-warning' : 'text-error'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    room.availability === 'available' ? 'bg-success availability-pulse' :
                    room.availability === 'busy' ? 'bg-warning' : 'bg-error'
                  }`}></div>
                  <span>{room.availability === 'available' ? 'Available' : room.availability === 'busy' ? 'Busy' : 'Occupied'}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {room.amenities.slice(0, 4).map((amenity) => (
                  <span
                    key={amenity}
                    className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Next available: <span className="font-medium text-foreground">{room.nextAvailable}</span>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Eye"
                    onClick={() => handleRoomSelect(room)}
                  >
                    Details
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    iconName="Calendar"
                    onClick={() => handleQuickBook(room)}
                    disabled={room.availability === 'occupied'}
                  >
                    {room.availability === 'available' ? 'Book' : 'Schedule'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="ml-16 lg:ml-64 pt-16">
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Room Explorer & Discovery</h1>
                <p className="text-muted-foreground">Find your perfect study environment with advanced filtering and virtual tours</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-success rounded-full availability-pulse"></div>
                  <span>{filteredRooms.filter(r => r.availability === 'available').length} available now</span>
                </div>
                <Button variant="outline" iconName="Heart">
                  My Favorites ({favoriteRooms.size})
                </Button>
              </div>
            </div>
            
            {/* Search Bar */}
            <SearchBar
              onSearch={handleSearch}
              onViewToggle={setCurrentView}
              currentView={currentView}
              resultsCount={filteredRooms.length}
            />
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar - Filters */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                <FilterPanel
                  filters={filters}
                  onFiltersChange={setFilters}
                  onClearFilters={() => setFilters({})}
                />
                
                {/* Popular Rooms */}
                <PopularRoomsSection
                  popularRooms={popularRooms}
                  onRoomSelect={handleRoomSelect}
                  onQuickBook={handleQuickBook}
                />
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {currentView === 'map' ? (
                <div className="space-y-6">
                  <MapView
                    selectedBuilding={selectedBuilding}
                    onBuildingSelect={setSelectedBuilding}
                    onRoomSelect={handleRoomSelect}
                    buildings={buildings}
                  />
                  
                  {/* Rooms in Selected Building */}
                  {selectedBuilding && (
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-4">
                        Rooms in {selectedBuilding.name}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredRooms
                          .filter(room => room.building === selectedBuilding.name)
                          .map((room) => (
                            <RoomCard
                              key={room.id}
                              room={room}
                              onRoomSelect={handleRoomSelect}
                              onFavoriteToggle={handleFavoriteToggle}
                              onQuickBook={handleQuickBook}
                            />
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Sort Options */}
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-foreground">
                      {filteredRooms.length} Rooms Found
                    </h2>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">Sort by:</span>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm"
                      >
                        <option value="popularity">Popularity</option>
                        <option value="rating">Rating</option>
                        <option value="capacity">Capacity</option>
                        <option value="availability">Availability</option>
                      </select>
                    </div>
                  </div>

                  {/* Room Results */}
                  {filteredRooms.length > 0 ? (
                    currentView === 'grid' ? renderRoomGrid() : renderRoomList()
                  ) : (
                    <div className="text-center py-12">
                      <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">No rooms found</h3>
                      <p className="text-muted-foreground mb-4">
                        Try adjusting your search criteria or filters
                      </p>
                      <Button variant="outline" onClick={() => {
                        setSearchQuery('');
                        setFilters({});
                      }}>
                        Clear all filters
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Room Detail Modal */}
      <RoomDetailModal
        room={selectedRoom}
        isOpen={showRoomModal}
        onClose={() => setShowRoomModal(false)}
        onBook={handleBookRoom}
        onFavoriteToggle={handleFavoriteToggle}
      />
    </div>
  );
};

export default RoomExplorerDiscovery;