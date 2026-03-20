import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/auth';
import { ASSETS } from '../data/assets';
import { motion, AnimatePresence } from 'motion/react';
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, isWithinInterval, isBefore } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Info, CheckCircle, MessageSquare, ArrowLeftRight, X } from 'lucide-react';
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
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [swapTargetDate, setSwapTargetDate] = useState<Date | null>(null);
  const [swapSuccess, setSwapSuccess] = useState(false);

  useEffect(() => {
    if (!isAuthReady || !user) return;

    const urlParams = new URLSearchParams(window.location.search);
    const assetIdFromUrl = urlParams.get('assetId');

    // Handle Demo User
    if (user.uid === 'demo-user-123') {
      const mockPortfolio: PortfolioItem[] = [
        {
          id: 'demo-p1',
          assetId: 'car-super-1',
          shares: 1,
        },
        {
          id: 'demo-p2',
          assetId: 'car-desert-2',
          shares: 2,
        }
      ];
      setPortfolio(mockPortfolio);
      
      const mockBookings: BookingItem[] = [
        {
          id: 'demo-b1',
          assetId: 'car-super-1',
          startDate: addDays(new Date(), 7).toISOString(),
          endDate: addDays(new Date(), 13).toISOString(),
          status: 'confirmed'
        }
      ];
      setBookings(mockBookings);
      if (!selectedAssetId) {
        setSelectedAssetId(assetIdFromUrl || 'car-super-1');
      }
      return;
    }

    // Fetch Portfolio
    const qPortfolio = query(collection(db, 'portfolio'), where('userId', '==', user.uid));
    const unsubPortfolio = onSnapshot(qPortfolio, (snapshot) => {
      const items: PortfolioItem[] = [];
      snapshot.forEach((doc) => items.push({ id: doc.id, ...doc.data() } as PortfolioItem));
      setPortfolio(items);
      if (items.length > 0 && !selectedAssetId) {
        const initialAssetId = assetIdFromUrl || items[0].assetId;
        setSelectedAssetId(initialAssetId);
      }
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
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center">
          <h2 className="text-2xl font-display font-bold text-primary mb-2">Access Denied</h2>
          <p className="text-gray-500">Please sign in to book your assets.</p>
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

  const getMaxDays = (sharesOwned: number, totalShares: number) => {
    // Standard calculation: 365 days / total shares * shares owned
    const daysPerShare = Math.floor(365 / totalShares);
    return daysPerShare * sharesOwned;
  };

  const maxDays = selectedAsset ? getMaxDays(selectedAsset.shares, selectedAsset.totalShares) : 0;
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const onDateClick = (day: Date) => {
    const booked = isDayBooked(day);
    if (booked) {
      // Check if it's NOT the user's booking (simplified for MVP: all booked dates are "others" unless in upcoming)
      const isMyBooking = bookings.some(b => 
        b.assetId === selectedAssetId && 
        isWithinInterval(day, { start: new Date(b.startDate), end: new Date(b.endDate) })
      );
      
      if (!isMyBooking) {
        setSwapTargetDate(day);
        setShowSwapModal(true);
      }
      return;
    }

    if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
      setSelectedRange({ start: day, end: null });
    } else if (selectedRange.start && !selectedRange.end) {
      if (isBefore(day, selectedRange.start)) {
        setSelectedRange({ start: day, end: null });
      } else {
        // Check if any day in the range is booked
        const range = eachDayOfInterval({ start: selectedRange.start, end: day });
        const hasBookedDay = range.some(d => isDayBooked(d));
        
        if (hasBookedDay) {
          setSelectedRange({ start: day, end: null });
        } else {
          setSelectedRange({ start: selectedRange.start, end: day });
        }
      }
    }
  };

  const isDayBooked = (day: Date) => {
    return bookings.some(booking => {
      if (booking.assetId !== selectedAssetId) return false;
      const start = new Date(booking.startDate);
      const end = new Date(booking.endDate);
      return isWithinInterval(day, { start, end });
    });
  };

  return (
    <>
      <div className="min-h-screen bg-surface flex flex-col lg:flex-row overflow-hidden">
      {/* Left Pane: Asset Focus */}
      <div className="w-full lg:w-[40%] h-[35vh] lg:h-screen sticky top-0 bg-primary relative overflow-hidden z-20">
        <AnimatePresence mode="wait">
          {selectedAsset ? (
            <motion.div
              key={selectedAsset.id}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <img 
                src={selectedAsset.imageUrl} 
                alt={selectedAsset.name} 
                className="w-full h-full object-cover opacity-60"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent" />
            </motion.div>
          ) : (
            <div className="absolute inset-0 bg-primary flex items-center justify-center">
              <CalendarIcon className="w-24 h-24 text-white/10" />
            </div>
          )}
        </AnimatePresence>

        <div className="relative h-full flex flex-col justify-end p-6 lg:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center space-x-3 mb-2 lg:mb-4">
              <div className="w-6 h-6 lg:w-8 lg:h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                <CalendarIcon className="w-3 h-3 lg:w-4 lg:h-4 text-accent" />
              </div>
              <span className="text-accent text-[10px] lg:text-xs font-bold uppercase tracking-[0.3em] block">Booking Portal</span>
            </div>
            <h1 className="text-2xl lg:text-6xl font-display font-bold text-white mb-4 lg:mb-8 leading-tight">
              {selectedAsset?.name || 'Select an Asset'}
            </h1>

            {selectedAsset && (
              <div className="hidden lg:grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
                  <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Your Shares</p>
                  <p className="text-xl font-bold text-white">{selectedAsset.shares} / {selectedAsset.totalShares}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
                  <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Max Stay</p>
                  <p className="text-xl font-bold text-white">{maxDays} Days</p>
                </div>
              </div>
            )}

            <div className="mt-4 lg:mt-12 overflow-x-auto no-scrollbar">
              <div className="flex flex-nowrap lg:flex-wrap gap-2 pb-2">
                {portfolioAssets.map(asset => (
                  <button
                    key={asset.id}
                    onClick={() => setSelectedAssetId(asset.id)}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                      selectedAssetId === asset.id 
                        ? 'bg-accent text-primary' 
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    {asset.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Pane: Booking Experience */}
      <div className="flex-1 h-screen overflow-y-auto custom-scrollbar bg-surface">
        <div className="max-w-3xl mx-auto p-4 sm:p-8 lg:p-16">
          {/* Asset Context Header (Mobile/Small screens) */}
          <div className="lg:hidden mb-8 p-6 bg-primary rounded-[2rem] text-white shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[10px] text-accent font-bold uppercase tracking-widest mb-1">Currently Booking</p>
                <h2 className="text-2xl font-display font-bold">{selectedAsset?.name}</h2>
              </div>
              <div className="bg-white/10 p-2 rounded-xl">
                <Info className="w-4 h-4 text-accent" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <p className="text-[8px] text-white/40 uppercase tracking-widest mb-1">Shares</p>
                <p className="text-sm font-bold">{selectedAsset?.shares} / {selectedAsset?.totalShares}</p>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <p className="text-[8px] text-white/40 uppercase tracking-widest mb-1">Max Stay</p>
                <p className="text-sm font-bold">{maxDays} Days</p>
              </div>
            </div>
          </div>

          {/* Upcoming Timeline */}
          <div className="mb-16">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">Your Upcoming Trips</h3>
            <div className="flex space-x-4 overflow-x-auto pb-4 no-scrollbar">
              {bookings.length > 0 ? (
                bookings.map(booking => {
                  const asset = ASSETS.find(a => a.id === booking.assetId);
                  return (
                    <motion.div 
                      key={booking.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex-shrink-0 w-64 bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-white/10 shadow-sm"
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                          <CalendarIcon className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-primary">{asset?.name}</p>
                          <p className="text-[10px] text-gray-500">{booking.status.toUpperCase()}</p>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-primary">
                        {format(new Date(booking.startDate), 'MMM d')} — {format(new Date(booking.endDate), 'MMM d, yyyy')}
                      </p>
                    </motion.div>
                  );
                })
              ) : (
                <p className="text-sm text-gray-400 italic">No upcoming bookings scheduled.</p>
              )}
            </div>
          </div>

          {/* Oversized Calendar */}
          <div className="relative">
            <div className="flex items-center justify-between mb-8 lg:mb-12">
              <div className="relative">
                <span className="absolute -top-8 lg:-top-12 -left-2 lg:-left-4 text-[60px] lg:text-[120px] font-display font-black text-primary/5 select-none pointer-events-none">
                  {format(currentMonth, 'MM')}
                </span>
                <h2 className="text-2xl lg:text-4xl font-display font-bold text-primary relative z-10">
                  {format(currentMonth, 'MMMM')}
                  <span className="text-accent ml-1">.</span>
                </h2>
              </div>
              <div className="flex space-x-2">
                <button onClick={prevMonth} className="p-3 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors border border-gray-100 dark:border-white/10">
                  <ChevronLeft className="w-5 h-5 text-primary" />
                </button>
                <button onClick={nextMonth} className="p-3 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors border border-gray-100 dark:border-white/10">
                  <ChevronRight className="w-5 h-5 text-primary" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 mb-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                <div key={d} className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 lg:gap-2">
              {(() => {
                const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
                const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
                const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
                const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
                const days = [];
                let day = startDate;

                while (day <= endDate) {
                  const cloneDay = day;
                  const isSelected = selectedRange.start && (
                    selectedRange.end 
                      ? isWithinInterval(day, { start: selectedRange.start, end: selectedRange.end })
                      : isSameDay(day, selectedRange.start)
                  );
                  const isCurrentMonth = isSameMonth(day, monthStart);
                  const booked = isDayBooked(day);
                  const isToday = isSameDay(day, new Date());

                  days.push(
                    <div
                      key={day.toString()}
                      onClick={() => !booked && onDateClick(cloneDay)}
                      className={`
                        aspect-square flex flex-col items-center justify-center rounded-xl lg:rounded-2xl transition-all relative group
                        ${!isCurrentMonth ? 'opacity-20' : ''}
                        ${booked ? 'cursor-not-allowed' : 'cursor-pointer active:scale-95'}
                        ${isSelected ? 'bg-primary text-on-primary shadow-xl scale-105 z-10' : 'hover:bg-gray-50 dark:hover:bg-white/5'}
                      `}
                    >
                      {isToday && !isSelected && <div className="absolute top-1 lg:top-2 w-1 h-1 bg-accent rounded-full" />}
                      <span className={`text-xs lg:text-sm font-bold ${booked ? 'text-gray-300 line-through' : ''}`}>
                        {format(day, 'd')}
                      </span>
                      {booked && <div className="absolute inset-0 bg-red-500/5 rounded-xl lg:rounded-2xl" />}
                    </div>
                  );
                  day = addDays(day, 1);
                }
                return days;
              })()}
            </div>
          </div>

          {/* Rules Grid */}
          <div className="mt-24 grid grid-cols-2 gap-4">
            <div className="p-6 rounded-3xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
              <Info className="w-5 h-5 text-accent mb-4" />
              <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-2">FIFO Priority</h4>
              <p className="text-[10px] text-gray-500 leading-relaxed">Bookings are confirmed on a first-come, first-served basis to ensure fairness.</p>
            </div>
            <div className="p-6 rounded-3xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
              <CalendarIcon className="w-5 h-5 text-accent mb-4" />
              <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Flexible Stays</h4>
              <p className="text-[10px] text-gray-500 leading-relaxed">Book individual days or custom ranges. Select a start and end date to define your stay.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Bar */}
      <AnimatePresence>
        {selectedRange.start && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 w-[90%] max-w-xl z-[100]"
          >
            <div className="bg-primary/80 backdrop-blur-2xl border border-white/10 p-6 rounded-[2.5rem] shadow-2xl flex items-center justify-between">
              <div>
                <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Confirm Selection</p>
                <p className="text-sm font-bold text-white">
                  {format(selectedRange.start, 'MMM d')}
                  {selectedRange.end ? ` — ${format(selectedRange.end, 'MMM d, yyyy')}` : ' (Select end date)'}
                </p>
              </div>
              <button
                disabled={isBooking || bookingSuccess || !selectedRange.end}
                onClick={handleConfirmBooking}
                className="px-8 py-3 bg-accent text-primary font-bold text-xs uppercase tracking-widest rounded-full hover:scale-105 transition-all disabled:opacity-50 flex items-center"
              >
                {isBooking ? (
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                ) : bookingSuccess ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Confirmed
                  </>
                ) : (
                  'Book Now'
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Swap Request Modal */}
      <AnimatePresence>
        {showSwapModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSwapModal(false)}
              className="absolute inset-0 bg-primary/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[2.5rem] p-8 shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setShowSwapModal(false)}
                className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ArrowLeftRight className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-display font-bold text-primary mb-2">Request a Swap</h3>
                <p className="text-gray-500 text-sm">
                  This date is currently reserved by another owner. Would you like to propose a date swap?
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Target Date</span>
                  <span className="text-sm font-bold text-primary">{swapTargetDate && format(swapTargetDate, 'MMMM d, yyyy')}</span>
                </div>
                <div className="flex items-center text-xs text-accent font-medium">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Anonymous request will be sent to the owner.
                </div>
              </div>

              {swapSuccess ? (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-sm font-bold text-green-600">Swap Request Sent!</p>
                </motion.div>
              ) : (
                <button
                  onClick={() => {
                    setSwapSuccess(true);
                    setTimeout(() => {
                      setShowSwapModal(false);
                      setSwapSuccess(false);
                    }, 2000);
                  }}
                  className="w-full py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all active:scale-[0.98] shadow-lg shadow-primary/20"
                >
                  Propose Swap
                </button>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  </>
);
};
