import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Lock, Home, CreditCard, Smartphone, Wallet, CheckCircle2, ChevronLeft, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

interface PaymentDetails {
  method: "card" | "upi" | "netbanking" | "wallet";
  cardName?: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
  upiId?: string;
  bank?: string;
}

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<"card" | "upi" | "netbanking" | "wallet">("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCVV, setShowCVV] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    method: "card",
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
    upiId: "",
    bank: ""
  });

  // Sample room data
  const roomData = {
    type: "Single Bed",
    floor: "Ground",
    cost: 12000,
    securityDeposit: 25000,
    processingFee: 500
  };

  const totalAmount = roomData.cost + roomData.securityDeposit + roomData.processingFee;

  const handlePaymentChange = (field: string, value: string) => {
    setPaymentDetails(prev => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const validatePayment = () => {
    if (selectedMethod === "card") {
      if (!paymentDetails.cardName || !paymentDetails.cardNumber || !paymentDetails.cardExpiry || !paymentDetails.cardCvv) {
        toast.error("Please fill all card details");
        return false;
      }
      if (paymentDetails.cardNumber.replace(/\s/g, '').length !== 16) {
        toast.error("Card number must be 16 digits");
        return false;
      }
      if (paymentDetails.cardCvv.length !== 3) {
        toast.error("CVV must be 3 digits");
        return false;
      }
    } else if (selectedMethod === "upi") {
      if (!paymentDetails.upiId) {
        toast.error("Please enter your UPI ID");
        return false;
      }
    } else if (selectedMethod === "netbanking") {
      if (!paymentDetails.bank) {
        toast.error("Please select your bank");
        return false;
      }
    }
    return true;
  };

  // const handlePayment = async () => {
  //   if (!validatePayment()) return;

  //   setIsProcessing(true);
  //   try {
  //     // Simulate payment processing
  //     await new Promise(resolve => setTimeout(resolve, 2000));
  //     toast.success("Payment successful! Your room is confirmed.");
  //     setTimeout(() => navigate("/"), 1500);
  //   } catch (error) {
  //     toast.error("Payment failed. Please try again.");
  //   } finally {
  //     setIsProcessing(false);
  //   }
  // };
    const handlePayment = async () => {
    if (!validatePayment()) return;

    setIsProcessing(true);
    
    try {
      // 1. Simulate Network Delay
      await new Promise(resolve => setTimeout(resolve, 2500));

      // 2. Generate a Mock Transaction ID
      const transactionId = "TXN-" + Math.random().toString(36).substr(2, 9).toUpperCase();

      // 3. PERSISTENCE: Save booking info to localStorage 
      // This allows your "Home" or "Profile" page to show the room as booked.
      const bookingData = {
        transactionId,
        roomDetails: roomData,
        date: new Date().toLocaleDateString(),
        status: "Confirmed"
      };
      localStorage.setItem("latestBooking", JSON.stringify(bookingData));

      // 4. Success Feedback
      toast.success(`Room Confirmed! ID: ${transactionId}`);

      // 5. Redirect to a "Success Page" or Home
      // Passing the ID in state so the next page can show it
      setTimeout(() => navigate("/success", { state: { transactionId } }), 1000);

    } catch (error) {
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-background">
      {/* Decorative background */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-secondary/5 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            className="gap-2 mb-6 text-foreground hover:bg-muted"
            onClick={() => navigate("/confirmation")}
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Confirmation
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">Secure Payment</h1>
          <p className="text-muted-foreground text-lg">Complete your booking with a secure payment</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Method Selection */}
            <Card className="bg-white/60 dark:bg-slate-950/60 backdrop-blur-md border-muted shadow-lg">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Select Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={selectedMethod} onValueChange={(value: any) => setSelectedMethod(value)}>
                  {/* Credit/Debit Card */}
                  <div
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedMethod === "card"
                        ? "border-primary bg-primary/5"
                        : "border-muted hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedMethod("card")}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="text-foreground font-semibold cursor-pointer flex-1">
                        <CreditCard className="w-5 h-5 inline mr-2" />
                        Credit / Debit Card
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground ml-6">Visa, Mastercard, American Express</p>
                  </div>

                  {/* UPI */}
                  <div
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedMethod === "upi"
                        ? "border-primary bg-primary/5"
                        : "border-muted hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedMethod("upi")}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="text-foreground font-semibold cursor-pointer flex-1">
                        <Smartphone className="w-5 h-5 inline mr-2" />
                        UPI
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground ml-6">Google Pay, PhonePe, BHIM</p>
                  </div>

                  {/* Net Banking */}
                  <div
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedMethod === "netbanking"
                        ? "border-primary bg-primary/5"
                        : "border-muted hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedMethod("netbanking")}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <RadioGroupItem value="netbanking" id="netbanking" />
                      <Label htmlFor="netbanking" className="text-foreground font-semibold cursor-pointer flex-1">
                        <Wallet className="w-5 h-5 inline mr-2" />
                        Net Banking
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground ml-6">All major Indian banks</p>
                  </div>

                  {/* Digital Wallet */}
                  <div
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedMethod === "wallet"
                        ? "border-primary bg-primary/5"
                        : "border-muted hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedMethod("wallet")}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <RadioGroupItem value="wallet" id="wallet" />
                      <Label htmlFor="wallet" className="text-foreground font-semibold cursor-pointer flex-1">
                        <Wallet className="w-5 h-5 inline mr-2" />
                        Digital Wallet
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground ml-6">Paytm, Amazon Pay, Airtel Money</p>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Payment Details Form */}
            <Card className="bg-white/60 dark:bg-slate-950/60 backdrop-blur-md border-muted shadow-lg">
              <CardHeader>
                <CardTitle className="text-foreground">Payment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedMethod === "card" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardName" className="text-foreground font-medium">Cardholder Name</Label>
                      <Input
                        id="cardName"
                        placeholder="John Doe"
                        value={paymentDetails.cardName}
                        onChange={(e) => handlePaymentChange("cardName", e.target.value)}
                        className="bg-white/50 dark:bg-slate-900/50 border-muted"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardNumber" className="text-foreground font-medium">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={paymentDetails.cardNumber}
                        onChange={(e) => handlePaymentChange("cardNumber", formatCardNumber(e.target.value))}
                        maxLength={19}
                        className="bg-white/50 dark:bg-slate-900/50 border-muted"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardExpiry" className="text-foreground font-medium">Expiry Date</Label>
                        <Input
                          id="cardExpiry"
                          placeholder="MM/YY"
                          value={paymentDetails.cardExpiry}
                          onChange={(e) => handlePaymentChange("cardExpiry", formatExpiry(e.target.value))}
                          maxLength={5}
                          className="bg-white/50 dark:bg-slate-900/50 border-muted"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardCvv" className="text-foreground font-medium">CVV</Label>
                        <div className="relative">
                          <Input
                            id="cardCvv"
                            type={showCVV ? "text" : "password"}
                            placeholder="123"
                            value={paymentDetails.cardCvv}
                            onChange={(e) => handlePaymentChange("cardCvv", e.target.value.replace(/\D/g, '').slice(0, 3))}
                            maxLength={3}
                            className="bg-white/50 dark:bg-slate-900/50 border-muted pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowCVV(!showCVV)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showCVV ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedMethod === "upi" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="upiId" className="text-foreground font-medium">UPI ID</Label>
                      <Input
                        id="upiId"
                        placeholder="yourname@upi"
                        value={paymentDetails.upiId}
                        onChange={(e) => handlePaymentChange("upiId", e.target.value)}
                        className="bg-white/50 dark:bg-slate-900/50 border-muted"
                      />
                    </div>
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                      <p className="text-sm text-foreground">You will receive a UPI prompt to complete the payment.</p>
                    </div>
                  </div>
                )}

                {selectedMethod === "netbanking" && (
                  <div className="space-y-4">
                    <Label className="text-foreground font-medium">Select Your Bank</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {["HDFC Bank", "ICICI Bank", "Axis Bank", "SBI", "Kotak Bank", "Yes Bank"].map((bank) => (
                        <button
                          key={bank}
                          onClick={() => handlePaymentChange("bank", bank)}
                          className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                            paymentDetails.bank === bank
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-muted text-foreground hover:border-primary/50"
                          }`}
                        >
                          {bank}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedMethod === "wallet" && (
                  <div className="space-y-4">
                    <Label className="text-foreground font-medium">Select Wallet</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {["Paytm", "Amazon Pay", "Google Pay", "PhonePe"].map((wallet) => (
                        <button
                          key={wallet}
                          onClick={() => handlePaymentChange("bank", wallet)}
                          className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                            paymentDetails.bank === wallet
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-muted text-foreground hover:border-primary/50"
                          }`}
                        >
                          {wallet}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <Lock className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground font-medium">
                Your payment is secured with 256-bit encryption
              </span>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 space-y-6">
            {/* Room Summary */}
            <Card className="bg-white/60 dark:bg-slate-950/60 backdrop-blur-md border-muted shadow-lg sticky top-8">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Home className="w-5 h-5 text-primary" />
                  Booking Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Room Type</p>
                  <p className="font-semibold text-foreground">{roomData.type}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Floor</p>
                  <p className="font-semibold text-foreground">{roomData.floor} Floor</p>
                </div>

                <Separator className="bg-muted" />

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Monthly Rent</span>
                    <span className="font-semibold text-foreground">₹{roomData.cost.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Security Deposit</span>
                    <span className="font-semibold text-foreground">₹{roomData.securityDeposit.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Processing Fee</span>
                    <span className="font-semibold text-foreground">₹{roomData.processingFee.toLocaleString()}</span>
                  </div>
                </div>

                <Separator className="bg-muted" />

                <div className="flex justify-between items-center">
                  <span className="text-foreground font-semibold">Total Amount</span>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">₹{totalAmount.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">for first month</p>
                  </div>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 h-12 gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Pay Now
                    </>
                  )}
                </Button>

                <Badge variant="outline" className="w-full justify-center py-2">
                  <Smartphone className="w-3 h-3 mr-2" />
                  Get instant confirmation
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
