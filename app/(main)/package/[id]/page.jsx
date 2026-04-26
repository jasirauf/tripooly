'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { packages } from '../../../data/packages';
import PackageDetailsUI from '../../../components/PackageDetailsUI';
import './page.css';

const PackageDetails = () => {
  const { id } = useParams();
  const trip = packages.find(p => p.id === parseInt(id));

  if (!trip) return <div style={{ padding: '100px', textAlign: 'center' }}>Trip not found</div>;

  return <PackageDetailsUI trip={trip} />;
};

export default PackageDetails;
