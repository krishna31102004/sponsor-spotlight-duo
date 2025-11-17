import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Target, DollarSign, Users, MapPin, Calendar, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const BusinessForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    organizationName: "",
    category: "",
    location: "",
    audienceSize: "",
    mission: "",
    eventDate: "",
    minBudget: "",
    maxBudget: "",
    purpose: "",
    benefits: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation: at least check if budget range is provided
    if (formData.minBudget && formData.maxBudget) {
      const min = parseFloat(formData.minBudget);
      const max = parseFloat(formData.maxBudget);
      
      if (min > max) {
        toast.error("Minimum budget cannot be greater than maximum budget");
        return;
      }
    }
    
    console.log("Business Form Data:", formData);
    toast.success("Profile saved! We'll match you with potential sponsors.");
    // Store in localStorage for now
    localStorage.setItem("businessProfile", JSON.stringify(formData));
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background decorative circles */}
      <div className="fixed top-1/4 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 blur-3xl opacity-30 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-secondary/15 via-primary/10 to-accent/15 blur-3xl opacity-20 pointer-events-none" />

      {/* Header */}
      <header className="relative border-b border-border/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary" />
              <span className="text-xl font-bold text-foreground">circle</span>
            </div>
          </div>
          <Button 
            variant="ghost" 
            className="gap-2 text-muted-foreground hover:text-foreground"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Hub
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 relative z-10 max-w-3xl">
        {/* Hero Section */}
        <div className="text-center mb-10 space-y-3">
          <Badge className="mb-2 bg-primary/20 text-primary border-primary/30 px-4 py-1">
            <Target className="w-3 h-3 mr-1" />
            For Businesses & Clubs
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            Create Your Profile
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Tell us about your event or organization to match with the right sponsors.
          </p>
          <p className="text-sm text-muted-foreground/70">
            All fields are optional, but more details help us find better matches.
          </p>
        </div>

        {/* Form Card */}
        <Card className="glass-card rounded-3xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Organization Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">Organization Details</h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="orgName" className="text-foreground">Organization or Event Name</Label>
                <Input
                  id="orgName"
                  placeholder="ASU Circle Innovators"
                  value={formData.organizationName}
                  onChange={(e) => updateField("organizationName", e.target.value)}
                  className="bg-background/50 border-border/50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-foreground">Category</Label>
                  <Input
                    id="category"
                    placeholder="Student hackathon team"
                    value={formData.category}
                    onChange={(e) => updateField("category", e.target.value)}
                    className="bg-background/50 border-border/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    Location
                  </Label>
                  <Input
                    id="location"
                    placeholder="Tempe, AZ"
                    value={formData.location}
                    onChange={(e) => updateField("location", e.target.value)}
                    className="bg-background/50 border-border/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="audience" className="text-foreground flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    Expected Audience Size
                  </Label>
                  <Input
                    id="audience"
                    placeholder="500+ students"
                    value={formData.audienceSize}
                    onChange={(e) => updateField("audienceSize", e.target.value)}
                    className="bg-background/50 border-border/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eventDate" className="text-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Event Date (if applicable)
                  </Label>
                  <Input
                    id="eventDate"
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => updateField("eventDate", e.target.value)}
                    className="bg-background/50 border-border/50"
                  />
                </div>
              </div>
            </div>

            {/* Mission & Purpose */}
            <div className="space-y-4 pt-4 border-t border-border/50">
              <div className="space-y-2">
                <Label htmlFor="mission" className="text-foreground">Mission Statement</Label>
                <Textarea
                  id="mission"
                  placeholder="Describe what your organization does and its impact..."
                  value={formData.mission}
                  onChange={(e) => updateField("mission", e.target.value)}
                  className="bg-background/50 border-border/50 min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="purpose" className="text-foreground">How will you use the funding?</Label>
                <Textarea
                  id="purpose"
                  placeholder="Venue costs, prizes, travel scholarships for underrepresented students..."
                  value={formData.purpose}
                  onChange={(e) => updateField("purpose", e.target.value)}
                  className="bg-background/50 border-border/50 min-h-[80px]"
                />
              </div>
            </div>

            {/* Budget Range - FOCUS AREA */}
            <div className="space-y-4 pt-4 border-t border-border/50">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="w-5 h-5 text-success" />
                <h3 className="text-xl font-semibold text-foreground">Funding Expectations</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                What's your ideal sponsorship range? This helps us match you with the right sponsors.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minBudget" className="text-foreground">Minimum Amount ($)</Label>
                  <Input
                    id="minBudget"
                    type="number"
                    placeholder="2000"
                    value={formData.minBudget}
                    onChange={(e) => updateField("minBudget", e.target.value)}
                    className="bg-background/50 border-border/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxBudget" className="text-foreground">Maximum Amount ($)</Label>
                  <Input
                    id="maxBudget"
                    type="number"
                    placeholder="5000"
                    value={formData.maxBudget}
                    onChange={(e) => updateField("maxBudget", e.target.value)}
                    className="bg-background/50 border-border/50"
                  />
                </div>
              </div>

              {formData.minBudget && formData.maxBudget && (
                <div className="glass-card rounded-xl p-4 bg-primary/10 border-primary/30">
                  <p className="text-sm text-foreground font-medium">
                    Your target range: ${parseInt(formData.minBudget).toLocaleString()} - ${parseInt(formData.maxBudget).toLocaleString()}
                  </p>
                </div>
              )}
            </div>

            {/* Sponsor Benefits */}
            <div className="space-y-4 pt-4 border-t border-border/50">
              <div className="space-y-2">
                <Label htmlFor="benefits" className="text-foreground">What can you offer sponsors?</Label>
                <Textarea
                  id="benefits"
                  placeholder="Logo placement, booth space, social media mentions, resume access..."
                  value={formData.benefits}
                  onChange={(e) => updateField("benefits", e.target.value)}
                  className="bg-background/50 border-border/50 min-h-[80px]"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white shadow-lg shadow-primary/30 h-12 text-base font-semibold"
              >
                Save Profile & Find Sponsors
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default BusinessForm;
