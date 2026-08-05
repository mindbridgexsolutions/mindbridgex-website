'use client';

import { useState } from 'react';

interface ReviewModalProps {
  bookingId: string;
  userId: string;
  ceremonyId: string;
  ceremonyName: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ReviewModal({
  bookingId,
  userId,
  ceremonyId,
  ceremonyName,
  onClose,
  onSuccess,
}: ReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId,
          userId,
          ceremonyId,
          rating,
          comment,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit feedback.');

      onSuccess();
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl animate-in fade-in zoom-in duration-150">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Rate Ceremony</h3>
            <p className="text-xs text-amber-700 font-semibold">{ceremonyName}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-lg font-bold">
            ✕
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-medium">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Star Selector */}
          <div className="text-center space-y-2">
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Overall Experience & Dakshina
            </label>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="text-3xl transition transform hover:scale-110 focus:outline-none"
                >
                  <span className={(hoverRating || rating) >= star ? 'text-amber-500' : 'text-gray-200'}>
                    ★
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Comment Box */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Your Review / Feedback
            </label>
            <textarea
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="How was the Pandit's recitation, punctuality, and rituals?"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-2.5 rounded-xl text-xs transition shadow-sm disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
