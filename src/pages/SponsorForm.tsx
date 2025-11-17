import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, DollarSign, Building2, Target, Users, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SponsorForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    website: "",
    contactName: "",
    contactEmail: "",
    minBudget: "",
    maxBudget: "",
    goals: "",
    interests: "",
    preferredLocations: "",
    targetAudience: ""
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
    
    console.log("Sponsor Form Data:", formData);
    toast.success("Profile saved! We'll match you with relevant opportunities.");
    // Store in localStorage for now
    localStorage.setItem("sponsorProfile", JSON.stringify(formData));
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
          <Badge className="mb-2 bg-secondary/20 text-secondary border-secondary/30 px-4 py-1">
            <Heart className="w-3 h-3 mr-1" />
            For Sponsors
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            Create Your Sponsor Profile
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Share your goals and budget to discover the perfect sponsorship opportunities.
          </p>
          <p className="text-sm text-muted-foreground/70">
            All fields are optional, but more details help us find better matches.
          </p>
        </div>

        {/* Form Card */}
        <Card className="glass-card rounded-3xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="w-5 h-5 text-accent" />
                <h3 className="text-xl font-semibold text-foreground">Company Information</h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-foreground">Company or Organization Name</Label>
                <Input
                  id="companyName"
                  placeholder="Tech Innovations Inc."
                  value={formData.companyName}
                  onChange={(e) => updateField("companyName", e.target.value)}
                  className="bg-background/50 border-border/50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry" className="text-foreground">Industry</Label>
                  <Input
                    id="industry"
                    placeholder="Software, Finance, Healthcare..."
                    value={formData.industry}
                    onChange={(e) => updateField("industry", e.target.value)}
                    className="bg-background/50 border-border/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website" className="text-foreground">Website (optional)</Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://yourcompany.com"
                    value={formData.website}
                    onChange={(e) => updateField("website", e.target.value)}
                    className="bg-background/50 border-border/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactName" className="text-foreground">Contact Name</Label>
                  <Input
                    id="contactName"
                    placeholder="John Smith"
                    value={formData.contactName}
                    onChange={(e) => updateField("contactName", e.target.value)}
                    className="bg-background/50 border-border/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactEmail" className="text-foreground">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    placeholder="john@company.com"
                    value={formData.contactEmail}
                    onChange={(e) => updateField("contactEmail", e.target.value)}
                    className="bg-background/50 border-border/50"
                  />
                </div>
              </div>
            </div>

            {/* Sponsorship Budget - FOCUS AREA */}
            <div className="space-y-4 pt-4 border-t border-border/50">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="w-5 h-5 text-success" />
                <h3 className="text-xl font-semibold text-foreground">Sponsorship Budget</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                What's your sponsorship budget range? This helps us match you with suitable opportunities.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minBudget" className="text-foreground">Minimum Amount ($)</Label>
                  <Input
                    id="minBudget"
                    type="number"
                    placeholder="1000"
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
                    placeholder="10000"
                    value={formData.maxBudget}
                    onChange={(e) => updateField("maxBudget", e.target.value)}
                    className="bg-background/50 border-border/50"
                  />
                </div>
              </div>

              {formData.minBudget && formData.maxBudget && (
                <div className="glass-card rounded-xl p-4 bg-secondary/10 border-secondary/30">
                  <p className="text-sm text-foreground font-medium">
                    Your budget range: ${parseInt(formData.minBudget).toLocaleString()} - ${parseInt(formData.maxBudget).toLocaleString()}
                  </p>
                </div>
              )}
            </div>

            {/* Sponsorship Goals & Interests */}
            <div className="space-y-4 pt-4 border-t border-border/50">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">Your Goals & Interests</h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="goals" className="text-foreground">What are your sponsorship goals?</Label>
                <Textarea
                  id="goals"
                  placeholder="Brand awareness, talent recruitment, community impact, product promotion..."
                  value={formData.goals}
                  onChange={(e) => updateField("goals", e.target.value)}
                  className="bg-background/50 border-border/50 min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interests" className="text-foreground">What types of events interest you?</Label>
                <Textarea
                  id="interests"
                  placeholder="Hackathons, tech conferences, student clubs, community events, research projects..."
                  value={formData.interests}
                  onChange={(e) => updateField("interests", e.target.value)}
                  className="bg-background/50 border-border/50 min-h-[80px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="locations" className="text-foreground">Preferred Locations</Label>
                  <Input
                    id="locations"
                    placeholder="Arizona, California, or nationwide"
                    value={formData.preferredLocations}
                    onChange={(e) => updateField("preferredLocations", e.target.value)}
                    className="bg-background/50 border-border/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="targetAudience" className="text-foreground flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    Target Audience
                  </Label>
                  <Input
                    id="targetAudience"
                    placeholder="Students, professionals, researchers..."
                    value={formData.targetAudience}
                    onChange={(e) => updateField("targetAudience", e.target.value)}
                    className="bg-background/50 border-border/50"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-secondary to-primary hover:opacity-90 text-white shadow-lg shadow-secondary/30 h-12 text-base font-semibold"
              >
                Save Profile & Discover Opportunities
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SponsorForm;
