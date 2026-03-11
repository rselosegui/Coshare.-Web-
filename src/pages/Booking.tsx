import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/auth';
import { ASSETS } from '../data/assets';
import { motion } from 'motion/react';
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, isWithinInterval } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Info, CheckCircle } from 'lucide-react';
import { collection, query, where, onSnapshot, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { handleFirestoreError, OperationType } from '../utils/firestoreErrorHandler';

interface PortfolioItem {
  id: string;
  assetId: string;
  shares: number;
}

interface BookingItem {
  id: string;
  assetId: string;
  startDate: string;
  endDate: string;
  status: string;
}

export const Booking = () => {
  const { user, isAuthReady } = useAuth();
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [selectedAssetId, setSelectedAssetId] = useState<string>('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState<{ start: Date | null, end: Date | null }>({ start: null, end: null });
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    if (!isAuthReady || !user) return;

    // Fetch Portfolio
    const qPortfolio = query(collection(db, 'portfolio'), where('userId', '==', user.uid));
    const unsubPortfolio = onSnapshot(qPortfolio, (snapshot) => {
      const items: PortfolioItem[] = [];
      snapshot.forEach((doc) => items.push({ id: doc.id, ...doc.data() } as PortfolioItem));
      setPortfolio(items);
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'portfolio'));

    // Fetch Bookings
    const qBookings = query(collection(db, 'bookings'), where('userId', '==', user.uid));
    const unsubBookings = onSnapshot(qBookings, (snapshot) => {
      const items: BookingItem[] = [];
      snapshot.forEach((doc) => items.push({ id: doc.id, ...doc.data() } as BookingItem));
      setBookings(items);
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'bookings'));

    return () => {
      unsubPortfolio();
      unsubBookings();
    };
  }, [user, isAuthReady]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
        <div className="text-center">
          <h2 className="text-2xl font-display font-bold text-[#0b1b34] mb-2">Access Denied</h2>
          <p className="text-gray-600">Please sign in to book your assets.</p>
        </div>
      </div>
    );
  }

  const portfolioAssets = portfolio.map(p => {
    const asset = ASSETS.find(a => a.id === p.assetId);
    return { ...asset, ...p };
  }).filter(a => a.id !== undefined);

  const selectedAsset = portfolioAssets.find(a => a.id === selectedAssetId);

  const handleConfirmBooking = async () => {
    if (!user || !selectedAssetId || !selectedRange.start || !selectedRange.end) return;

    setIsBooking(true);
    try {
      await addDoc(collection(db, 'bookings'), {
        userId: user.uid,
        assetId: selectedAssetId,
        startDate: selectedRange.start.toISOString(),
        endDate: selectedRange.end.toISOString(),
        status: 'confirmed',
        createdAt: new Date().toISOString()
      });
      setBookingSuccess(true);
      setTimeout(() => {
        setBookingSuccess(false);
        setSelectedRange({ start: null, end: null });
      }, 3000);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'bookings');
    } finally {
      setIsBooking(false);
    }
  };

  // Calculate max days based on rules
  const getMaxDays = (totalShares: number) => {
    if (totalShares <= 2) return 182;
    if (totalShares <= 4) return 91;
    if (totalShares <= 6) return 60;
    if (totalShares <= 8) return 45;
    return 36;
  };

  const maxDays = selectedAsset ? getMaxDays(selectedAsset.totalShares) : 0;

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const onDateClick = (day: Date) => {
    const start = startOfWeek(day, { weekStartsOn: 1 }); // Monday
    const end = endOfWeek(day, { weekStartsOn: 1 }); // Sunday

    // Check if any day in the selected week is already booked
    const isWeekBooked = eachDayOfInterval({ start, end }).some(d => isDayBooked(d));

    if (isWeekBooked) {
      // Don't allow selecting a week that has booked days
      return;
    }

    setSelectedRange({ start, end });
  };

  const isDayBooked = (day: Date) => {
    return bookings.some(booking => {
      if (booking.assetId !== selectedAssetId) return false;
      const start = new Date(booking.startDate);
      const end = new Date(booking.endDate);
      return isWithinInterval(day, { start, end });
    });
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-6">
        <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-5 h-5 text-[#0b1b34]" />
        </button>
        <h2 className="text-xl font-bold text-[#0b1b34]">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronRight className="w-5 h-5 text-[#0b1b34]" />
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const dateFormat = "EEE";
    let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="text-center text-xs font-bold text-gray-400 uppercase tracking-wider py-2" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="grid grid-cols-7 mb-2">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "d");
        const cloneDay = day;
        
        const isSelected = selectedRange.start && selectedRange.end && isWithinInterval(day, { start: selectedRange.start, end: selectedRange.end });
        const isCurrentMonth = isSameMonth(day, monthStart);
        const booked = isDayBooked(day);

        days.push(
          <div
            className={`p-1 relative ${booked ? 'cursor-not-allowed' : 'cursor-pointer'} ${!isCurrentMonth ? 'opacity-30' : ''}`}
            key={day.toString()}
            onClick={() => {
              if (!booked) {
                onDateClick(cloneDay);
              }
            }}
          >
            <div className={`
              h-12 w-full flex items-center justify-center text-sm font-medium rounded-lg transition-all
              ${booked ? 'bg-red-50 text-red-500 border border-red-100 line-through' : 
                isSelected ? 'bg-[#0b1b34] text-white shadow-md' : 
                'bg-white text-[#0b1b34] border border-gray-100 hover:border-[#0b1b34] hover:bg-gray-50'}
            `}>
              {formattedDate}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 gap-1 mb-1" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-[#0b1b34]">Smart Booking</h1>
          <p className="text-gray-600 mt-1">Schedule your time with your assets.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <label className="block text-sm font-bold text-[#0b1b34] mb-3 uppercase tracking-wider">Select Asset</label>
              <div className="space-y-3">
                {portfolioAssets.map(asset => (
                  <button
                    key={asset.id}
                    onClick={() => setSelectedAssetId(asset.id)}
                    className={`w-full text-left p-3 rounded-xl border-2 transition-all flex items-center ${
                      selectedAssetId === asset.id ? 'border-[#256ab1] bg-[#256ab1]/5' : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <img src={asset.imageUrl} alt={asset.name} className="w-10 h-10 rounded-lg object-cover mr-3" referrerPolicy="no-referrer" />
                    <div>
                      <p className="text-sm font-bold text-[#0b1b34] truncate">{asset.name}</p>
                      <p className="text-xs text-gray-500">{asset.sharesOwned}/{asset.totalShares} Shares</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {selectedAsset && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0b1b34] p-6 rounded-3xl text-white shadow-lg"
              >
                <div className="flex items-center mb-4 text-[#49bee4]">
                  <Info className="w-5 h-5 mr-2" />
                  <h3 className="font-bold">Booking Rules</h3>
                </div>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    First-in, first-out priority.
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Minimum booking: 1 day.
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Maximum consecutive days: <strong className="text-white ml-1">{maxDays} days</strong> (based on {selectedAsset.totalShares} co-owners).
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Selecting a day highlights the full Mon-Sun block.
                  </li>
                </ul>
              </motion.div>
            )}
          </div>

          {/* Calendar Area */}
          <div className="md:col-span-2">
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
              {!selectedAssetId ? (
                <div className="h-64 flex flex-col items-center justify-center text-center">
                  <CalendarIcon className="w-12 h-12 text-gray-300 mb-4" />
                  <p className="text-gray-500 font-medium">Select an asset to view availability</p>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {renderHeader()}
                  {renderDays()}
                  {renderCells()}

                  <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
                    <div>
                      {selectedRange.start && selectedRange.end ? (
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Selected Period</p>
                          <p className="text-sm font-bold text-[#0b1b34]">
                            {format(selectedRange.start, 'MMM d')} - {format(selectedRange.end, 'MMM d, yyyy')}
                          </p>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">Select a week to book</p>
                      )}
                    </div>
                    <button
                      disabled={!selectedRange.start || isBooking || bookingSuccess}
                      onClick={handleConfirmBooking}
                      className="px-6 py-3 bg-[#256ab1] text-white font-medium rounded-full hover:bg-[#256ab1]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                      {isBooking ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : bookingSuccess ? (
                        <>
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Confirmed
                        </>
                      ) : (
                        'Confirm Booking'
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
