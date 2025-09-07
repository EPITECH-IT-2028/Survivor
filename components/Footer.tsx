"use client";

import Link from "next/link";
import React from "react";
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="mt-20 bg-gray-900 py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-24 md:grid-cols-4">
          <div className="col-span-1">
            <h2 className="mb-4 font-canela-black text-2xl">Jeb Incubator.</h2>
            <p className="text-gray-400">
              Connecting the next generation of innovators and investors.
            </p>
          </div>

          <div className="col-span-1">
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/project-catalog" className="hover:text-primary">
                  Discover Projects
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  News Feed
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Events
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="hover:text-blue-400"
              >
                <FaTwitter size={24} />
              </Link>
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-blue-600"
              >
                <FaFacebook size={24} />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-pink-500"
              >
                <FaInstagram size={24} />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-blue-700"
              >
                <FaLinkedin size={24} />
              </Link>
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="mb-4 text-lg font-semibold">Stay Updated</h3>
            <form>
              <div className="flex items-center gap-2">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <Input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  placeholder="Your email"
                  autoComplete="email"
                  required
                  className="w-full rounded-md bg-secondary px-4 py-2 text-gray-900"
                />
                <Button
                  type="submit"
                  className="rounded-r-md bg-blue-600 px-4 py-2 hover:bg-blue-700"
                >
                  Subscribe
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} JEB Incubator. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
