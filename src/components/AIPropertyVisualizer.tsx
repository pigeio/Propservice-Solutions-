import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Check,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  X,
  Clock,
  Building,
  RefreshCw,
  Search,
  MessageSquare,
  Send,
} from 'lucide-react';
import { BBMP_ZONES, SERVICES_LIST } from '../data/propServiceData';

interface AIPropertyVisualizerProps {
  isOpen: boolean;
  onClose: () => void;
  onNotify: (msg: string) => void;
  onOpenBookingModal?: (serviceId?: string) => void;
}

type PropertyType = 'apartment' | 'villa' | 'plot' | 'commercial';
type DocumentStatus = 'a_khata' | 'b_khata' | 'panchayat' | 'sale_deed_only' | 'eswathu';
type ServiceGoal = 'ekhata' | 'mutation' | 'title_audit' | 'loan_prep';

interface DiagnosticResult {
  title: string;
  eligibilityStatus: 'direct' | 'conditional' | 'complex';
  eligibilityBadge: string;
  summary: string;
  recommendedServiceId: string;
  recommendedServiceName: string;
  estimatedTimeline: string;
  mandatoryDocuments: { name: string; note: string }[];
  scrutinyPoints: string[];
  departmentJurisdiction: string;
}

const KNOWLEDGE_BASE_QUESTIONS = [
  {
    q: 'Can a B-Khata property be converted to a digital e-Khata?',
    category: 'e-Khata',
    answer:
      'Yes, under BBMP guidelines, physical B-Khata properties can be converted to digital e-Khata records. While they remain classified under the B-register for layout/setback regularizations, having a digital e-Khata with an authenticated Property Identification Number (PID) is now required for property tax filing, utility meters, and registrations under Kaveri 2.0.',
  },
  {
    q: 'What if I am missing the historical Mother Deed (prior 30 years)?',
    category: 'Title Audit',
    answer:
      'Missing mother deeds are very common for older Bengaluru properties. Our legal diligence team conducts deep archive searches at jurisdictional Sub-Registrar offices to trace the parent registration numbers and retrieve certified copies (CC) from the government archives to establish a continuous unbroken title chain.',
  },
  {
    q: 'How does Kaveri 2.0 affect property sales and bank mortgages?',
    category: 'Kaveri 2.0',
    answer:
      'Karnataka’s Kaveri 2.0 system directly validates digital BBMP e-Khata records and owner Aadhaar credentials before scheduling registration appointments. If your property still holds an old physical manual paper Khata or the PID is unverified, the Sub-Registrar system blocks sale deed registration and banks reject loan disbursements.',
  },
  {
    q: 'What is the procedure for Khata Transfer (Mutation) after property purchase?',
    category: 'Khata Transfer',
    answer:
      'After executing and registering your Sale Deed, you must apply for municipal mutation to update the BBMP tax ledger from the seller’s name to yours. This involves submitting registered sale deed copies, up-to-date tax receipts, 15-year Encumbrance Certificates, and receiving endorsement from the Assistant Revenue Officer (ARO).',
  },
  {
    q: 'My property is in a Gram Panchayat area. Do I need an e-Khata or E-Swathu?',
    category: 'Panchayat / Rural',
    answer:
      'Properties falling outside BBMP limits (Panchayat jurisdiction) require digital E-Swathu certification (Form 9 and Form 11A) issued through the Karnataka Rural Development portal. If your locality was recently absorbed into BBMP limits, we assist in transitioning your Panchayat documents into BBMP municipal e-Khata.',
  },
];

export const AIPropertyVisualizer: React.FC<AIPropertyVisualizerProps> = ({
  isOpen,
  onClose,
  onNotify,
  onOpenBookingModal,
}) => {
  const [activeTab, setActiveTab] = useState<'checker' | 'ask'>('checker');

  // Diagnostic form state
  const [propType, setPropType] = useState<PropertyType>('apartment');
  const [docStatus, setDocStatus] = useState<DocumentStatus>('a_khata');
  const [goal, setGoal] = useState<ServiceGoal>('ekhata');
  const [selectedZone, setSelectedZone] = useState('south');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DiagnosticResult | null>(null);

  // Q&A state
  const [searchQuery, setSearchQuery] = useState('');
  const [customQuestion, setCustomQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [isAnswering, setIsAnswering] = useState(false);

  if (!isOpen) return null;

  const handleRunDiagnostic = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);

    setTimeout(() => {
      let diag: DiagnosticResult;

      if (docStatus === 'a_khata') {
        diag = {
          title: 'Direct Digital e-Khata & Verification Ready',
          eligibilityStatus: 'direct',
          eligibilityBadge: 'High Eligibility · Streamlined Approval',
          summary:
            'Your property has registered municipal approvals. It qualifies for streamlined digitization into the official Karnataka Kaveri 2.0 e-Khata registry.',
          recommendedServiceId: goal === 'mutation' ? 'khata_transfer' : 'e_khata',
          recommendedServiceName: goal === 'mutation' ? 'Khata Transfer (Property Mutation)' : 'BBMP e-Khata Conversion',
          estimatedTimeline: '7 – 10 Business Days',
          departmentJurisdiction: 'BBMP Jurisdictional Ward Revenue Office (ARO)',
          mandatoryDocuments: [
            { name: 'Registered Title Deed (Sale/Gift Deed)', note: 'Certified copy showing latest registration index' },
            { name: 'Physical A-Khata Certificate & Extract', note: 'Original or attested copy of physical record' },
            { name: 'Latest Property Tax Paid Receipt (SAS)', note: 'Must reflect current financial year' },
            { name: 'Owner(s) Aadhaar & Electricity (BESCOM) Bill', note: 'Required for Kaveri 2.0 Aadhaar e-KYC integration' },
            { name: 'Occupancy Certificate (OC)', note: 'Applicable for multistoried apartment complexes' },
          ],
          scrutinyPoints: [
            'PID (Property Identification Number) alignment with municipal survey grid',
            'Cross-check of floor built-up area versus tax payment slab receipts',
            'Verification of unencumbered title on Kaveri 2.0 portal',
          ],
        };
      } else if (docStatus === 'b_khata') {
        diag = {
          title: 'B-Khata Digital Mapping & Scrutiny Required',
          eligibilityStatus: 'conditional',
          eligibilityBadge: 'Conditional · Bylaw Scrutiny Needed',
          summary:
            'Your property is currently registered under the B-register. While eligible for a digital e-Khata identifier under Kaveri 2.0, municipal scrutiny of layout approvals and road setback clearances will be conducted.',
          recommendedServiceId: 'e_khata',
          recommendedServiceName: 'BBMP e-Khata Conversion & Scrutiny',
          estimatedTimeline: '12 – 15 Business Days',
          departmentJurisdiction: 'BBMP Zonal Assistant Revenue Officer (ARO)',
          mandatoryDocuments: [
            { name: 'Registered Sale Deed with Parent Title Deeds', note: 'Complete chain of conveyance' },
            { name: 'B-Khata Assessment Ledger & Tax Receipts', note: 'Continuous receipts for past 3 financial years' },
            { name: 'Electricity (BESCOM) Consumer ID / Account Statement', note: 'Meter billing address verification' },
            { name: 'Owner(s) Identity Documents (Aadhaar & PAN)', note: 'Mandatory KYC documentation' },
            { name: 'Site Boundary / Survey Sketch', note: 'To determine setback and layout compliance' },
          ],
          scrutinyPoints: [
            'Assessment of betterment charges or compounding fees required for regularization',
            'Verification of any pending municipal property tax arrears',
            'Survey demarcation check against road margin reservations',
          ],
        };
      } else if (docStatus === 'panchayat' || docStatus === 'eswathu') {
        diag = {
          title: 'Panchayat E-Swathu or BBMP Transition Assessment',
          eligibilityStatus: 'conditional',
          eligibilityBadge: 'Panchayat / E-Swathu Jurisdiction',
          summary:
            'Properties with Form 9 and Form 11A require verification through the Rural E-Swathu portal. If your locality has been newly merged into Greater Bengaluru, an absorption audit is conducted.',
          recommendedServiceId: 'e_swathu',
          recommendedServiceName: 'E-Swathu & Panchayat Regularization',
          estimatedTimeline: '15 – 20 Business Days',
          departmentJurisdiction: 'Jurisdictional Gram Panchayat / Taluk Office & BBMP',
          mandatoryDocuments: [
            { name: 'Panchayat Form 9 & Form 11A / 11B', note: 'Digital extract with official QR code' },
            { name: 'Registered Sale Deed with Chain of Title', note: '30-year historical title chain' },
            { name: 'Panchayat Tax Paid Receipts', note: 'Up-to-date rural tax acknowledgments' },
            { name: 'Layout Approval & DC Conversion Order', note: 'District Commissioner agricultural-to-non-agricultural order' },
          ],
          scrutinyPoints: [
            'DC Conversion validity for non-agricultural residential usage',
            'Verification of village survey number demarcation against land records',
            'Coordination with Revenue Inspector for on-ground inspection',
          ],
        };
      } else {
        diag = {
          title: 'First-Time Khata Registration & Title Chain Audit',
          eligibilityStatus: 'complex',
          eligibilityBadge: 'Fresh Registration · Comprehensive Legal Diligence',
          summary:
            'You currently hold a registered sale deed without a municipal Khata. A fresh registration and retrospective title audit will be conducted to obtain your first government e-Khata.',
          recommendedServiceId: 'title_search',
          recommendedServiceName: 'Title Verification & Fresh Khata Filing',
          estimatedTimeline: '15 – 20 Business Days',
          departmentJurisdiction: 'Sub-Registrar Office & Jurisdictional BBMP Ward',
          mandatoryDocuments: [
            { name: 'Registered Sale Deed with Registration Seal', note: 'Original registered document' },
            { name: '30-Year Encumbrance Certificate (EC Form 15)', note: 'Reflecting all historical encumbrances' },
            { name: 'Mother Deed / Parent Conveyance Deeds', note: 'Traced to the original layout developer' },
            { name: 'Layout Sanction Plan / BDA Approval Order', note: 'Approved blueprint copies' },
            { name: 'BESCOM Connection Order / Sanction', note: 'Utility account verification' },
          ],
          scrutinyPoints: [
            'Deep search of Sub-Registrar archives to bridge any missing conveyance links',
            'Verification that property has no ongoing civil litigation or revenue stay',
            'Submission of fresh assessment application to jurisdictional ARO',
          ],
        };
      }

      setResult(diag);
      setIsAnalyzing(false);
      onNotify('Document audit analysis completed!');
    }, 800);
  };

  const handleCustomQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;

    setIsAnswering(true);
    setTimeout(() => {
      const qLower = customQuestion.toLowerCase();
      let ans = '';

      if (qLower.includes('b-khata') || qLower.includes('b khata')) {
        ans =
          'Regarding B-Khata: In Bengaluru, properties with B-Khata can still be digitized into an e-Khata under Kaveri 2.0 with a unique Property Identification Number (PID). However, bank loan approvals and building plan sanctions remain limited until full A-Khata regularization occurs. We assist in auditing your setback and layout documents to determine if conversion to A-Khata is currently viable.';
      } else if (qLower.includes('mother deed') || qLower.includes('parent deed') || qLower.includes('missing')) {
        ans =
          'Regarding Missing Mother Deeds: Under Karnataka property regulations, a clear 30-year unbroken title chain is essential for seamless sale deed registration and bank loans. If prior deeds are missing, our legal advocates can trace previous volume and page numbers at the Sub-Registrar office to apply for certified copies (CC) directly from department archives.';
      } else if (qLower.includes('time') || qLower.includes('how long') || qLower.includes('days')) {
        ans =
          'Processing Timelines: Standard digital BBMP e-Khata conversions typically take 7 to 10 business days when all title deeds and tax receipts are in order. Khata transfers (mutation) take approximately 12 to 15 business days. Complex cases involving missing parent deeds or Gram Panchayat E-Swathu transitions may take up to 20 business days.';
      } else if (qLower.includes('cost') || qLower.includes('fee') || qLower.includes('price')) {
        ans =
          'Fee Structure: PropService Solutions charges fixed, transparent facilitation fees: BBMP e-Khata (₹4,500), Khata Transfer (₹6,500), Encumbrance Certificate Search (₹2,500), and 30-Year Legal Title Search (₹8,500). All official government statutory stamp fees and municipal cess are billed at actuals with official government receipts provided.';
      } else {
        ans =
          `Based on Karnataka property regulations and BBMP bylaws, your inquiry regarding "${customQuestion}" requires cross-referencing your property's title deed with municipal revenue records. Our senior property advocates can review your specific documents, identify any registration checkpoints under Kaveri 2.0, and guide you through the process without any government office queues.`;
      }

      setAiAnswer(ans);
      setIsAnswering(false);
    }, 700);
  };

  const filteredQuestions = KNOWLEDGE_BASE_QUESTIONS.filter(
    (item) =>
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/70 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl border border-neutral-300 bg-white p-6 sm:p-8 shadow-2xl transition-all dark:border-neutral-800 dark:bg-neutral-950 text-neutral-900 dark:text-white">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-neutral-200 pb-4 dark:border-neutral-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-400">
              <Sparkles className="h-4 w-4" />
              <span>AI Property Document & e-Khata Advisor</span>
            </div>
            <h3 className="mt-1 text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
              Instant Legal Eligibility & Document Audit
            </h3>
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
              Check your property’s e-Khata eligibility, get a tailored municipal document checklist, or consult the Karnataka property regulations advisor.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Mode Navigation Tabs */}
        <div className="mt-5 flex border-b border-neutral-200 dark:border-neutral-800">
          <button
            type="button"
            onClick={() => setActiveTab('checker')}
            className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-bold transition-colors ${
              activeTab === 'checker'
                ? 'border-neutral-950 text-neutral-950 dark:border-white dark:text-white'
                : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>Interactive Document Audit & Eligibility</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ask')}
            className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-bold transition-colors ${
              activeTab === 'ask'
                ? 'border-neutral-950 text-neutral-950 dark:border-white dark:text-white'
                : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <HelpCircle className="h-4 w-4" />
            <span>AI Legal FAQ & Property Query</span>
          </button>
        </div>

        {/* TAB 1: INTERACTIVE DOCUMENT CHECKER */}
        {activeTab === 'checker' && (
          <div className="mt-6 space-y-6">
            <form onSubmit={handleRunDiagnostic} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* 1. Property Type */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                    1. Property Type
                  </label>
                  <select
                    value={propType}
                    onChange={(e) => setPropType(e.target.value as PropertyType)}
                    className="w-full rounded-md border border-neutral-300 bg-neutral-50 px-3 py-2 text-xs text-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
                  >
                    <option value="apartment">Apartment / High-Rise Flat</option>
                    <option value="villa">Independent Villa / House</option>
                    <option value="plot">Vacant Residential Plot</option>
                    <option value="commercial">Commercial Building / Site</option>
                  </select>
                </div>

                {/* 2. Current Document Status */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                    2. Current Paper Status
                  </label>
                  <select
                    value={docStatus}
                    onChange={(e) => setDocStatus(e.target.value as DocumentStatus)}
                    className="w-full rounded-md border border-neutral-300 bg-neutral-50 px-3 py-2 text-xs text-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
                  >
                    <option value="a_khata">Physical A-Khata Document</option>
                    <option value="b_khata">Physical B-Khata / Tax Register</option>
                    <option value="panchayat">Gram Panchayat (Form 9 & 11)</option>
                    <option value="eswathu">Digital E-Swathu Certificate</option>
                    <option value="sale_deed_only">Sale Deed Only (No Khata yet)</option>
                  </select>
                </div>

                {/* 3. Primary Goal */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                    3. What Do You Need?
                  </label>
                  <select
                    value={goal}
                    onChange={(e) => setGoal(e.target.value as ServiceGoal)}
                    className="w-full rounded-md border border-neutral-300 bg-neutral-50 px-3 py-2 text-xs text-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
                  >
                    <option value="ekhata">Mandatory Digital e-Khata</option>
                    <option value="mutation">Khata Transfer (Property Mutation)</option>
                    <option value="title_audit">30-Year Title Search & EC</option>
                    <option value="loan_prep">Pre-Registration & Loan Preparation</option>
                  </select>
                </div>

                {/* 4. BBMP Zone */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                    4. Bengaluru Ward / Zone
                  </label>
                  <select
                    value={selectedZone}
                    onChange={(e) => setSelectedZone(e.target.value)}
                    className="w-full rounded-md border border-neutral-300 bg-neutral-50 px-3 py-2 text-xs text-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
                  >
                    {BBMP_ZONES.map((zone) => (
                      <option key={zone.id} value={zone.id}>
                        {zone.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isAnalyzing}
                  className="rounded-md bg-neutral-950 px-6 py-2.5 text-xs font-bold text-white shadow-xs transition-colors hover:bg-neutral-800 disabled:opacity-50 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 flex items-center gap-2"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
                  <span>{isAnalyzing ? 'Analyzing Municipal Bylaws...' : 'Run Document Eligibility Audit'}</span>
                </button>
              </div>
            </form>

            {/* Diagnostic Results Card */}
            {result && (
              <div className="rounded-xl border border-neutral-300 bg-neutral-50 p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/80 space-y-5 animate-in fade-in duration-300">
                {/* Result Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200 pb-4 dark:border-neutral-800">
                  <div>
                    <span className="inline-flex items-center gap-1 rounded bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-900 dark:bg-amber-950/80 dark:text-amber-300">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      {result.eligibilityBadge}
                    </span>
                    <h4 className="mt-2 text-lg font-bold text-neutral-950 dark:text-white">
                      {result.title}
                    </h4>
                  </div>

                  <div className="text-right sm:self-center">
                    <div className="text-[11px] uppercase tracking-wider text-neutral-500">Expected Timeline</div>
                    <div className="text-sm font-bold text-neutral-950 dark:text-white flex items-center gap-1 sm:justify-end">
                      <Clock className="h-3.5 w-3.5 text-neutral-600 dark:text-neutral-400" />
                      <span>{result.estimatedTimeline}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {result.summary}
                </p>

                {/* Two Columns: Checklist & Scrutiny */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                  {/* Left: Mandatory Checklist */}
                  <div className="md:col-span-7 rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
                    <h5 className="text-xs font-bold text-neutral-950 dark:text-white flex items-center gap-1.5 mb-3">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      <span>Mandatory Documents Required:</span>
                    </h5>
                    <ul className="space-y-2 text-xs">
                      {result.mandatoryDocuments.map((doc, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-neutral-900 dark:text-neutral-200">{doc.name}</strong>
                            <span className="block text-[11px] text-neutral-500 dark:text-neutral-400">{doc.note}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right: Key Scrutiny Checkpoints */}
                  <div className="md:col-span-5 rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950 space-y-4">
                    <div>
                      <h5 className="text-xs font-bold text-neutral-950 dark:text-white flex items-center gap-1.5 mb-2">
                        <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                        <span>Key Scrutiny Checkpoints:</span>
                      </h5>
                      <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
                        {result.scrutinyPoints.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-amber-600 dark:text-amber-400 font-bold">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t border-neutral-100 pt-3 dark:border-neutral-800 text-[11px]">
                      <span className="text-neutral-500">Government Authority:</span>
                      <div className="font-semibold text-neutral-900 dark:text-neutral-200 mt-0.5">
                        {result.departmentJurisdiction}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA to Book Consultation */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-200 pt-4 dark:border-neutral-800">
                  <div className="text-xs text-neutral-600 dark:text-neutral-400">
                    Recommended service: <strong className="text-neutral-900 dark:text-white">{result.recommendedServiceName}</strong>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      if (onOpenBookingModal) {
                        onOpenBookingModal(result.recommendedServiceId);
                      }
                    }}
                    className="w-full sm:w-auto rounded-md bg-neutral-950 px-5 py-2.5 text-xs font-bold text-white shadow-xs transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 flex items-center justify-center gap-2"
                  >
                    <span>Proceed with Consultation</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: AI LEGAL ADVISOR & FAQ */}
        {activeTab === 'ask' && (
          <div className="mt-6 space-y-6">
            {/* Custom Question Ask Input */}
            <form onSubmit={handleCustomQuestion} className="space-y-3">
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Ask a specific question about your Bengaluru property papers:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                  placeholder="e.g. My father registered the property in 1998, but we only have physical tax receipts, how do we get digital e-Khata?"
                  className="flex-grow rounded-md border border-neutral-300 px-3 py-2 text-xs text-neutral-900 focus:border-neutral-950 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
                />
                <button
                  type="submit"
                  disabled={isAnswering}
                  className="rounded-md bg-neutral-950 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-neutral-800 disabled:opacity-50 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 flex items-center gap-1.5 shrink-0"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>{isAnswering ? 'Analyzing...' : 'Ask Advisor'}</span>
                </button>
              </div>
            </form>

            {/* Custom AI Answer Box */}
            {aiAnswer && (
              <div className="rounded-xl border border-amber-300 bg-amber-50/70 p-5 dark:border-amber-900/60 dark:bg-amber-950/30 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-300">
                  <Sparkles className="h-4 w-4" />
                  <span>Legal Diligence Guidance:</span>
                </div>
                <p className="text-neutral-800 dark:text-neutral-200 leading-relaxed">
                  {aiAnswer}
                </p>
              </div>
            )}

            {/* Curated Frequently Asked Property Law Scenarios */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Bengaluru Municipal Guidance Scenarios:
                </h4>
                <div className="relative w-48">
                  <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-neutral-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter scenarios..."
                    className="w-full rounded border border-neutral-300 pl-8 pr-2 py-1 text-[11px] text-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {filteredQuestions.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-neutral-200 bg-white p-4 shadow-2xs dark:border-neutral-800 dark:bg-neutral-900 space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-xs text-neutral-950 dark:text-white">
                        {item.q}
                      </span>
                      <span className="rounded bg-neutral-100 px-2 py-0.5 text-[10px] font-semibold text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300 shrink-0">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
