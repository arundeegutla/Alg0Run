"use client";

import RootLayout from "./layout";

import ProfileComponent from '@/components/Profile';

import { auth } from '@/firebase/clientApp'
import { useRouter } from 'next/navigation';
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from '@/components/Loading';
import Friends from '@/components/Friends'
import RecentPlays from '@/components/RecentPlays';
import { Play, Profile } from "@/firebase/models";
import { useEffect, useState } from "react";
import api from "@/firebase/api";

export default function Page() {
  const [user, loading, error] = useAuthState(auth);

  const router = useRouter();

  const [profile, setProfile] = useState({} as unknown as Profile);
  const [plays, setPlays] = useState([] as unknown as Play[]);
  var called = false;

  const refresh = () => {
    if (!user || called) return;

    called = true;
    user.getIdTokenResult().then((idToken) => {
      api.createProfile(idToken.token, user.displayName || "").then((res) => {
        console.log(res);
        api.getProfileByToken(idToken.token).then((res) => {
          if (res.data.error === "") {
            setProfile(res.data.profile);
            setPlays(res.data.plays);
          }
        });
      })
    });
  }

  useEffect(refresh, []);

  if (user) {
    console.log(user.displayName);
    if (!called && profile.totalScore === undefined) refresh();
  } else if (loading) {
    return (
      <Loading />
    );
  } else {
    router.push('/auth');
    return;
  }

  return (
    <RootLayout>
      <div className='flex flex-col items-stretch flex-wrap'>
        <ProfileComponent className='profile my-blur my-hover rounded-2xl' profile={{ metadata: user, score: (profile.totalScore || -1) }}></ProfileComponent>
        <RecentPlays className='profile my-blur my-hover rounded-2xl' plays={plays}></RecentPlays>
      </div>
      <div>
        <Friends className='profile my-blur my-hover rounded-2xl' friends={[]}></Friends>
      </div>
    </RootLayout>
  );
}
