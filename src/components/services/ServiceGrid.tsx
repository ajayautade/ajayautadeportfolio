"use client";

import { servicePackages, serviceAddOns } from "@/lib/services-data";
import { ServicePackageCard, AddOnCard } from "./ServiceCard";

export default function ServiceGrid() {
  return (
    <section className="py-8 sm:py-12">
      <div className="section-container">
        {/* Main packages */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servicePackages.map((service) => (
            <ServicePackageCard key={service.id} service={service} />
          ))}
        </div>

        {/* Add-ons */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
              Add-On Services
            </h2>
            <p className="mt-2 text-sm text-text-tertiary">
              Enhance your package with additional services
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {serviceAddOns.map((addon) => (
              <AddOnCard key={addon.id} addon={addon} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
