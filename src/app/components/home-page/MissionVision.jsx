"use client";
import React from "react";
import Section from "../Section";
import Image from "next/image";

const MissionVision = () => {
  return (
    <Section id="mission-vision" className="w-full py-8 md:py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
        <article className="flex flex-col gap-4">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Our Mission
            </p>
            <h2
              animation="left"
              className="text-gray-700 text-2xl md:text-3xl font-semibold"
            >
              Mission
            </h2>
            <p
              animation="js-down motion-md-right"
              className="max-w-xl text-base leading-relaxed tracking-wide text-gray-600"
            >
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis
              odit tenetur ipsam aperiam libero! Repellat incidunt
              necessitatibus, delectus, accusamus quas doloremque, consequatur
              eius non pariatur quia modi. Expedita, qui labore?
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
            <Image
              src="/images/mission-vision/mission.jpg"
              alt="Mission image"
              loading="eager"
              width={600}
              height={420}
              className="h-auto w-full object-cover"
            />
          </div>
        </article>

        <article className="flex flex-col gap-4 md:flex-col-reverse">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Our Vision
            </p>
            <h2 className="text-gray-700 text-2xl md:text-3xl font-semibold">
              Vision
            </h2>
            <p className="max-w-xl text-base leading-relaxed tracking-wide text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
              doloremque sequi magnam. Earum doloribus distinctio voluptas at
              possimus eos sunt vitae officia repellendus velit, similique eum,
              incidunt dolorum adipisci ducimus.
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
            <Image
              src="/images/mission-vision/vision.jpg"
              alt="Vision Image"
              loading="eager"
              width={600}
              height={420}
              className="h-auto w-full object-cover"
            />
          </div>
        </article>
      </div>
    </Section>
  );
};

export default MissionVision;
