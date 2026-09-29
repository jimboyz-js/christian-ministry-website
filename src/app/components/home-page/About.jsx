"use client";
import React from "react";
import Section from "../Section";
import Link from "next/link";

const About = () => {
  return (
    <Section id="about" className="w-full py-8 md:py-12">
      <div className="flex flex-col gap-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            About
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-gray-700 md:text-3xl">
            Christian Ministry Website
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
            animi iste, rerum dolor eum nihil eaque nulla autem nostrum modi
            cupiditate error quae, blanditiis sed expedita? Atque, perspiciatis!
            Beatae, quas?
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                Our mission
              </h3>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                alias neque expedita itaque necessitatibus velit quaerat veniam
                corrupti delectus. Assumenda soluta blanditiis amet debitis
                fugiat eveniet mollitia quis nihil libero!
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                What we believe
              </h3>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos,
                iste. Aperiam explicabo dicta soluta sit consectetur illum
                nesciunt corrupti. Architecto numquam repudiandae similique at,
                deserunt aliquam unde necessitatibus cupiditate qui?
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                Gospel-focused
              </h3>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellendus cum tempore et doloremque tempora ex quisquam iusto
                voluptate explicabo sunt? Quibusdam totam sit sint recusandae?
                Quaerat eaque perspiciatis veniam voluptatem.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                Our purpose
              </h3>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste
                ratione omnis quasi labore quaerat, reprehenderit quos! Quaerat
                consequatur illo veniam dolore aut, dolores magnam voluptas odio
                asperiores? Aliquam, possimus quidem.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
            <p className="text-center text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur fugit facilis nesciunt explicabo, at est placeat quis
              illum optio architecto obcaecati ipsam excepturi itaque ducimus
              dolor suscipit, asperiores rerum tenetur?
            </p>
          </div>

          <div className="flex justify-center">
            <Link
              className="inline-flex rounded-md bg-accent-soft px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-soft-hover"
              href="/about"
            >
              Explore Our Full Story
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default About;
