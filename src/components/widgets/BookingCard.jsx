// src/components/widgets/BookingCard.jsx
import React from "react";
import { Calendar, Clock, DollarSign } from "lucide-react";
import Button from "../buttons/Buttons";

// === STATUS BADGE COMPONENT ===
const StatusBadge = ({ status }) => {
  const styles = {
    Confirmed: 'bg-green-100 text-green-800 border border-green-300',
    Pending: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
    Completed: 'bg-blue-100 text-blue-800 border border-blue-300',
  };

  return (
    <span className={`px-3 py-1 rounded text-xs font-medium ${styles[status] || 'bg-gray-200 text-gray-800'}`}>
      {status}
    </span>
  );
};

// === BOOKING CARD COMPONENT ===
const BookingCard = ({ booking }) => {
  return (
    <div className="bg-white border border-gray-300 p-6 mb-4 rounded-lg">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-base mb-1">Booking #{booking.id}</h3>
          <StatusBadge status={booking.status} />
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <p className="text-sm text-gray-700">
          <span className="font-medium">Service:</span> {booking.service}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Provider:</span> {booking.provider}
        </p>
      </div>

      <div className="flex items-center gap-6 mb-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <span>{booking.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} />
          <span>{booking.time}</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign size={16} />
          <span>{booking.price}</span>
        </div>
      </div>

      <div className="flex gap-3">
        {booking.actions.map((action, index) => (
          <Button
            key={index}
            variant={action.variant}
            size="medium"
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        ))}
      </div>

      {booking.statusMessage && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-700 font-medium">
            {booking.statusMessage}
          </p>
        </div>
      )}
    </div>
  );
};

export default BookingCard;