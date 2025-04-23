"use client";
import { useSession } from 'next-auth/react';
import React from 'react'

function Profile() {
  const { data } = useSession();

  return (
    <div>
      <h2>{data?.user?.name}</h2>
    </div>
  )
}

export default Profile