'use client'

import { useEffect, useState } from "react";
import Image from 'next/Image';
import Link from "next/link";

export default function Articles() {
    return (
      <div className="mx-auto max-w-1/3">
        <h1 className="text-neutral-300 mt-10 text-xl">Posts</h1>
        <p className="text-neutral-300 text-xs">一些有趣的文章</p>
      </div>
    );
}
