import { Cloud, Server, ShieldCheck, Building2 } from 'lucide-react';

export interface Segment {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  imageUrl: string;
  companies: Company[];
}

export interface Company {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  segment: string;
  services: string[];
}

export const segments: Segment[] = [
  {
    id: 'cloud-services',
    name: 'Cloud Services',
    description: 'Leading cloud service providers offering IaaS, PaaS, and SaaS solutions',
    icon: Cloud,
    imageUrl: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    companies: [
      {
        id: 'aws',
        name: 'Amazon Web Services',
        description: 'Amazon Web Services offers reliable, scalable, and inexpensive cloud computing services.',
        logoUrl: 'https://images.pexels.com/photos/1595699/pexels-photo-1595699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        segment: 'cloud-services',
        services: ['Compute', 'Storage', 'Database', 'Machine Learning', 'IoT']
      },
      {
        id: 'microsoft-azure',
        name: 'Microsoft Azure',
        description: 'Microsoft Azure is a cloud computing service for building, testing, deploying, and managing applications and services.',
        logoUrl: 'https://images.pexels.com/photos/1595699/pexels-photo-1595699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        segment: 'cloud-services',
        services: ['Compute', 'Storage', 'AI', 'DevOps', 'Hybrid Cloud']
      },
      {
        id: 'google-cloud',
        name: 'Google Cloud Platform',
        description: 'Google Cloud Platform offers a suite of cloud computing services that runs on the same infrastructure that Google uses.',
        logoUrl: 'https://images.pexels.com/photos/1595699/pexels-photo-1595699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        segment: 'cloud-services',
        services: ['Compute', 'Storage', 'Big Data', 'Machine Learning', 'Kubernetes']
      }
    ]
  },
  {
    id: 'it-infrastructure',
    name: 'IT Infrastructure',
    description: 'Hardware and infrastructure solutions for enterprise IT needs',
    icon: Server,
    imageUrl: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    companies: [
      {
        id: 'cisco',
        name: 'Cisco Systems',
        description: 'Cisco Systems develops, manufactures, and sells networking hardware, software, and telecommunications equipment.',
        logoUrl: 'https://images.pexels.com/photos/1595699/pexels-photo-1595699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        segment: 'it-infrastructure',
        services: ['Networking', 'Security', 'Collaboration', 'Data Center', 'IoT']
      },
      {
        id: 'dell',
        name: 'Dell Technologies',
        description: 'Dell Technologies provides infrastructure solutions that help businesses transform their IT.',
        logoUrl: 'https://images.pexels.com/photos/1595699/pexels-photo-1595699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        segment: 'it-infrastructure',
        services: ['Servers', 'Storage', 'Cloud', 'Data Protection', 'PCs']
      },
      {
        id: 'hp',
        name: 'HP Enterprise',
        description: 'Hewlett Packard Enterprise specializes in servers, storage, networking, and consulting.',
        logoUrl: 'https://images.pexels.com/photos/1595699/pexels-photo-1595699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        segment: 'it-infrastructure',
        services: ['Servers', 'Storage', 'Networking', 'Edge Computing', 'Services']
      },
      {
        id: 'lenovo',
        name: 'Lenovo',
        description: 'Lenovo is a Chinese multinational technology company that designs and builds PCs, servers, and mobile devices.',
        logoUrl: 'https://images.pexels.com/photos/1595699/pexels-photo-1595699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        segment: 'it-infrastructure',
        services: ['Servers', 'Storage', 'PCs', 'Workstations', 'Mobile Devices']
      }
    ]
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    description: 'Solutions for protecting systems, networks, and data from cyber threats',
    icon: ShieldCheck,
    imageUrl: 'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    companies: [
      {
        id: 'paloalto',
        name: 'Palo Alto Networks',
        description: 'Palo Alto Networks is a global cybersecurity leader that provides advanced firewalls and cloud-based security solutions.',
        logoUrl: 'https://images.pexels.com/photos/1595699/pexels-photo-1595699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        segment: 'cybersecurity',
        services: ['Next-Gen Firewall', 'Cloud Security', 'Endpoint Protection', 'IoT Security', 'Zero Trust']
      },
      {
        id: 'trendmicro',
        name: 'Trend Micro',
        description: 'Trend Micro develops security software for servers, cloud computing environments, and small businesses.',
        logoUrl: 'https://images.pexels.com/photos/1595699/pexels-photo-1595699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        segment: 'cybersecurity',
        services: ['Endpoint Security', 'Cloud Security', 'Network Defense', 'Email Security', 'Security Intelligence']
      }
    ]
  },
  {
    id: 'data-center',
    name: 'Data Center Facility',
    description: 'Solutions for building and maintaining efficient, reliable data centers',
    icon: Building2,
    imageUrl: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    companies: [
      {
        id: 'schneider',
        name: 'Schneider Electric',
        description: 'Schneider Electric provides energy and automation digital solutions for efficiency and sustainability.',
        logoUrl: 'https://images.pexels.com/photos/1595699/pexels-photo-1595699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        segment: 'data-center',
        services: ['Power Management', 'Cooling', 'Racks', 'DCIM', 'Edge Computing']
      },
      {
        id: 'vertiv',
        name: 'Vertiv',
        description: 'Vertiv designs, builds and services critical infrastructure for data centers and communication networks.',
        logoUrl: 'https://images.pexels.com/photos/1595699/pexels-photo-1595699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        segment: 'data-center',
        services: ['Power', 'Thermal Management', 'IT Management', 'Infrastructure Monitoring', 'Services']
      },
      {
        id: 'eaton',
        name: 'Eaton',
        description: 'Eaton provides power management solutions that help customers effectively manage electrical power.',
        logoUrl: 'https://images.pexels.com/photos/1595699/pexels-photo-1595699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        segment: 'data-center',
        services: ['UPS', 'PDUs', 'Racks', 'Power Distribution', 'Energy Storage']
      },
      {
        id: 'huawei',
        name: 'Huawei',
        description: 'Huawei provides a wide range of ICT solutions and services for data centers.',
        logoUrl: 'https://images.pexels.com/photos/1595699/pexels-photo-1595699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        segment: 'data-center',
        services: ['Modular Data Centers', 'Servers', 'Storage', 'Network Equipment', 'Data Center Energy']
      }
    ]
  }
];