
import { ChevronDown, CheckCircle, Filter, FilterX } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";
import { mockHospitals, getMockRobotTypes } from "@/utils/mockDataGenerator";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileAwareDropdownItem } from "@/components/MobileAwareDropdownItem";
import { DatePickerWithPresets } from "@/components/DatePickerWithPresets";

interface DashboardFiltersProps {
  selectedHospital: string;
  selectedRobotTypes: string[];
  dateRange: string;
  date: {
    from: Date | undefined;
    to: Date | undefined;
  };
  onHospitalChange: (hospital: string) => void;
  onRobotTypeChange: (robotType: string) => void;
  onRemoveRobotType: (robotType: string) => void;
  onDateRangeChange: (range: string) => void;
  onCustomDateChange: (range: { from: Date | undefined; to: Date | undefined }) => void;
  visibleMetrics?: string[];
  onMetricToggle?: (metricId: string) => void;
  metricOptions?: { id: string; label: string }[];
  isMobile?: boolean;
}

export const DashboardFilters = ({
  selectedHospital,
  selectedRobotTypes,
  dateRange,
  date,
  onHospitalChange,
  onRobotTypeChange,
  onRemoveRobotType,
  onDateRangeChange,
  onCustomDateChange,
  visibleMetrics = [],
  onMetricToggle,
  metricOptions = [],
  isMobile: propIsMobile,
}: DashboardFiltersProps) => {
  const hookIsMobile = useIsMobile();
  const isMobile = propIsMobile !== undefined ? propIsMobile : hookIsMobile;
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  const mobileItemClasses = isMobile ? "py-[7.2px] px-2" : "px-2 py-1";

  return (
    <TooltipProvider>
      <div className="flex flex-col md:flex-col space-y-4 md:space-y-4 w-full max-w-full">
        {isMobile ? (
          <div className="flex flex-col space-y-4 w-full">
            <div className="flex space-x-2 w-full">
              <div className="w-[85%]">
                <DatePickerWithPresets
                  date={date}
                  onCustomDateChange={onCustomDateChange}
                  onDateRangeChange={onDateRangeChange}
                  dateRange={dateRange}
                  isMobile={true}
                />
              </div>

              <div className="w-[15%]">
                <Button
                  variant="ghost"
                  onClick={toggleMobileFilters}
                  className="w-full flex items-center justify-center text-white cursor-pointer p-0 hover:bg-[#526189]"
                >
                  {showMobileFilters ? (
                    <FilterX className="h-5 w-5 text-orange-500" style={{ strokeWidth: 2 }} />
                  ) : (
                    <Filter className="h-5 w-5 text-orange-500" style={{ strokeWidth: 2 }} />
                  )}
                </Button>
              </div>
            </div>

            {showMobileFilters && (
              <>
                <div className="w-full">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full flex items-center justify-between bg-[#526189] text-white border-white hover:bg-[#3E4F7C] hover:text-white cursor-pointer text-xs px-2 py-1"
                      >
                        <span className="flex-1 text-left truncate">
                          {selectedHospital === "All" ? "All Facilities" : selectedHospital}
                        </span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      fitToTriggerWidth
                      className="bg-[#526189] text-white"
                    >
                      {mockHospitals.map((hospital) => (
                        <MobileAwareDropdownItem
                          key={hospital}
                          tooltipContent={hospital === "All" ? "All Facilities" : hospital}
                          onClick={() => onHospitalChange(hospital)}
                          className={`text-xs text-white hover:bg-[#3E4F7C] hover:text-white focus:bg-[#3E4F7C] focus:text-white cursor-pointer overflow-hidden ${mobileItemClasses}`}
                        >
                          {hospital === "All" ? "All Facilities" : hospital}
                        </MobileAwareDropdownItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="w-full">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full flex items-center justify-between gap-2 bg-[#526189] text-white border-white hover:bg-[#3E4F7C] hover:text-white cursor-pointer text-xs px-2 py-1"
                      >
                        <span className="flex-1 text-left truncate">
                          {selectedRobotTypes.includes("All")
                            ? "All Mission Types"
                            : selectedRobotTypes.length === 1
                            ? selectedRobotTypes[0]
                            : `${selectedRobotTypes[0]} +${selectedRobotTypes.length - 1}`}
                        </span>
                        <div className="flex items-center gap-2">
                          {selectedRobotTypes.length > 0 && !selectedRobotTypes.includes("All") && (
                            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium bg-white/20 text-white rounded-full">
                              {selectedRobotTypes.length}
                            </span>
                          )}
                          <ChevronDown className="h-4 w-4" />
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      fitToTriggerWidth
                      className="bg-[#526189] text-white"
                    >
                      {getMockRobotTypes(selectedHospital).map((type) => (
                        <MobileAwareDropdownItem
                          key={type}
                          tooltipContent={type === "All" ? "All Mission Types" : type}
                          className={`flex items-center justify-between text-xs text-white hover:bg-[#3E4F7C] hover:text-white focus:bg-[#3E4F7C] focus:text-white cursor-pointer ${mobileItemClasses}`}
                          onClick={() => onRobotTypeChange(type)}
                        >
                          <span className="truncate">
                            {type === "All" ? "All Mission Types" : type}
                          </span>
                          {selectedRobotTypes.includes(type) && (
                            <CheckCircle
                              className="h-4 w-4 text-white flex-shrink-0 ml-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                onRemoveRobotType(type);
                              }}
                            />
                          )}
                        </MobileAwareDropdownItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {metricOptions && metricOptions.length > 0 && onMetricToggle && (
                  <div className="w-full">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="w-full flex items-center justify-between gap-2 bg-[#526189] text-white border-white hover:bg-[#3E4F7C] hover:text-white cursor-pointer text-xs px-2 py-1"
                        >
                          <span className="flex-1 text-left truncate">
                            {visibleMetrics.includes("all") 
                              ? "All Metrics" 
                              : `${visibleMetrics.length} Selected`}
                          </span>
                          <div className="flex items-center gap-2">
                            {visibleMetrics.length > 0 && !visibleMetrics.includes("all") && (
                              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium bg-white/20 text-white rounded-full">
                                {visibleMetrics.length}
                              </span>
                            )}
                            <ChevronDown className="h-4 w-4" />
                          </div>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent 
                        fitToTriggerWidth
                        className="bg-[#526189] text-white"
                      >
                        {metricOptions.map((option) => (
                          <MobileAwareDropdownItem
                            key={option.id}
                            tooltipContent={option.label}
                            className={`flex items-center justify-between text-xs text-white hover:bg-[#3E4F7C] hover:text-white focus:bg-[#3E4F7C] focus:text-white cursor-pointer ${mobileItemClasses}`}
                            onClick={() => onMetricToggle(option.id)}
                          >
                            <span className="truncate">{option.label}</span>
                            {visibleMetrics.includes(option.id) && (
                              <CheckCircle
                                className="h-4 w-4 text-white flex-shrink-0 ml-2"
                              />
                            )}
                          </MobileAwareDropdownItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 w-full max-w-full">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-2 w-full md:w-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full md:w-[185px] flex items-center justify-between bg-[#526189] text-white border-white hover:bg-[#3E4F7C] hover:text-white cursor-pointer text-xs px-2 py-1"
                  >
                    <span className="flex-1 text-left truncate">
                      {selectedHospital === "All" ? "All Facilities" : selectedHospital}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  fitToTriggerWidth
                  className="bg-[#526189] text-white"
                >
                  {mockHospitals.map((hospital) => (
                    <Tooltip key={hospital}>
                      <TooltipTrigger asChild>
                        <DropdownMenuItem
                          onClick={() => onHospitalChange(hospital)}
                          className="text-xs text-white hover:bg-[#3E4F7C] hover:text-white focus:bg-[#3E4F7C] focus:text-white cursor-pointer overflow-hidden px-2 py-1"
                        >
                          <span className="truncate">
                            {hospital === "All" ? "All Facilities" : hospital}
                          </span>
                        </DropdownMenuItem>
                      </TooltipTrigger>
                      <TooltipContent 
                        className="bg-[#14294B] text-white border-white/10"
                        side="right"
                      >
                        {hospital === "All" ? "All Facilities" : hospital}
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full md:w-[185px] flex items-center justify-between gap-2 bg-[#526189] text-white border-white hover:bg-[#3E4F7C] hover:text-white cursor-pointer text-xs px-2 py-1"
                  >
                    <span className="flex-1 text-left truncate">
                      {selectedRobotTypes.includes("All")
                        ? "All Mission Types"
                        : selectedRobotTypes.length === 1
                        ? selectedRobotTypes[0]
                        : `${selectedRobotTypes[0]} +${selectedRobotTypes.length - 1}`}
                    </span>
                    <div className="flex items-center gap-2">
                      {selectedRobotTypes.length > 0 && !selectedRobotTypes.includes("All") && (
                        <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium bg-white/20 text-white rounded-full">
                          {selectedRobotTypes.length}
                        </span>
                      )}
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  fitToTriggerWidth
                  className="bg-[#526189] text-white"
                >
                  {getMockRobotTypes(selectedHospital).map((type) => (
                    <Tooltip key={type}>
                      <TooltipTrigger asChild>
                        <DropdownMenuItem
                          className="flex items-center justify-between text-xs text-white hover:bg-[#3E4F7C] hover:text-white focus:bg-[#3E4F7C] focus:text-white cursor-pointer px-2 py-1"
                          onClick={() => onRobotTypeChange(type)}
                        >
                          <span className="truncate">
                            {type === "All" ? "All Mission Types" : type}
                          </span>
                          {selectedRobotTypes.includes(type) && (
                            <CheckCircle
                              className="h-4 w-4 text-white flex-shrink-0 ml-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                onRemoveRobotType(type);
                              }}
                            />
                          )}
                        </DropdownMenuItem>
                      </TooltipTrigger>
                      <TooltipContent 
                        className="bg-[#14294B] text-white border-white/10"
                        side="right"
                      >
                        {type === "All" ? "All Mission Types" : type}
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              {metricOptions && metricOptions.length > 0 && onMetricToggle && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full md:w-[185px] flex items-center justify-between gap-2 bg-[#526189] text-white border-white hover:bg-[#3E4F7C] hover:text-white cursor-pointer text-xs px-2 py-1"
                    >
                      <span className="flex-1 text-left truncate">
                        {visibleMetrics.includes("all") 
                          ? "All Metrics" 
                          : `${visibleMetrics.length} Selected`}
                      </span>
                      <div className="flex items-center gap-2">
                        {visibleMetrics.length > 0 && !visibleMetrics.includes("all") && (
                          <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium bg-white/20 text-white rounded-full">
                            {visibleMetrics.length}
                          </span>
                        )}
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    fitToTriggerWidth
                    className="bg-[#526189] text-white"
                  >
                    {metricOptions.map((option) => (
                      <Tooltip key={option.id}>
                        <TooltipTrigger asChild>
                          <DropdownMenuItem
                            className="flex items-center justify-between text-xs text-white hover:bg-[#3E4F7C] hover:text-white focus:bg-[#3E4F7C] focus:text-white cursor-pointer px-2 py-1"
                            onClick={() => onMetricToggle(option.id)}
                          >
                            <span className="truncate">{option.label}</span>
                            {visibleMetrics.includes(option.id) && (
                              <CheckCircle
                                className="h-4 w-4 text-white flex-shrink-0 ml-2"
                              />
                            )}
                          </DropdownMenuItem>
                        </TooltipTrigger>
                        <TooltipContent 
                          className="bg-[#14294B] text-white border-white/10"
                          side="right"
                        >
                          {option.label}
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            <div className="flex w-full md:w-auto">
              <DatePickerWithPresets
                date={date}
                onCustomDateChange={onCustomDateChange}
                onDateRangeChange={onDateRangeChange}
                dateRange={dateRange}
                className="w-[85%] md:w-[255px]"
              />
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};
