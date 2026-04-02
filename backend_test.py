#!/usr/bin/env python3

import requests
import sys
import json
from datetime import datetime

class DPMAPITester:
    def __init__(self, base_url="https://page-craft-228.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED")
        else:
            print(f"❌ {name} - FAILED: {details}")
        
        self.test_results.append({
            "test": name,
            "status": "PASSED" if success else "FAILED",
            "details": details
        })

    def test_root_endpoint(self):
        """Test GET /api/ endpoint"""
        try:
            response = requests.get(f"{self.base_url}/api/", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success:
                data = response.json()
                details += f", Response: {data}"
            self.log_test("Root API Endpoint", success, details)
            return success
        except Exception as e:
            self.log_test("Root API Endpoint", False, f"Exception: {str(e)}")
            return False

    def test_create_application(self):
        """Test POST /api/applications endpoint"""
        test_data = {
            "name": "Test Applicant",
            "email": "test@example.com",
            "phone": "+91 9876543210",
            "dob": "1995-05-15",
            "age": "28",
            "parent": "Test Parent",
            "marital": "Single",
            "city": "Maharashtra, Mumbai",
            "category": "Miss India (Age 16-28)"
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/applications",
                json=test_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            
            if success:
                data = response.json()
                # Verify response structure
                required_fields = ["id", "name", "email", "phone", "dob", "age", "parent", "marital", "city", "category", "status", "created_at"]
                missing_fields = [field for field in required_fields if field not in data]
                if missing_fields:
                    success = False
                    details += f", Missing fields: {missing_fields}"
                else:
                    details += f", Application ID: {data.get('id')}, Status: {data.get('status')}"
                    self.created_app_id = data.get('id')
            else:
                try:
                    error_data = response.json()
                    details += f", Error: {error_data}"
                except:
                    details += f", Response: {response.text}"
                    
            self.log_test("Create Application", success, details)
            return success
        except Exception as e:
            self.log_test("Create Application", False, f"Exception: {str(e)}")
            return False

    def test_get_applications(self):
        """Test GET /api/applications endpoint"""
        try:
            response = requests.get(f"{self.base_url}/api/applications", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            
            if success:
                data = response.json()
                if isinstance(data, list):
                    details += f", Found {len(data)} applications"
                    if len(data) > 0:
                        # Check structure of first application
                        app = data[0]
                        required_fields = ["id", "name", "email", "status"]
                        missing_fields = [field for field in required_fields if field not in app]
                        if missing_fields:
                            success = False
                            details += f", Missing fields in response: {missing_fields}"
                else:
                    success = False
                    details += f", Expected list, got: {type(data)}"
            else:
                try:
                    error_data = response.json()
                    details += f", Error: {error_data}"
                except:
                    details += f", Response: {response.text}"
                    
            self.log_test("Get Applications", success, details)
            return success
        except Exception as e:
            self.log_test("Get Applications", False, f"Exception: {str(e)}")
            return False

    def test_create_application_validation(self):
        """Test POST /api/applications with missing fields"""
        incomplete_data = {
            "name": "Test User",
            "email": "test@example.com"
            # Missing required fields
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/applications",
                json=incomplete_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            # Should return 422 for validation error
            success = response.status_code == 422
            details = f"Status: {response.status_code}"
            
            if not success:
                try:
                    data = response.json()
                    details += f", Response: {data}"
                except:
                    details += f", Response: {response.text}"
                    
            self.log_test("Application Validation", success, details)
            return success
        except Exception as e:
            self.log_test("Application Validation", False, f"Exception: {str(e)}")
            return False

    def test_cors_headers(self):
        """Test CORS headers are present"""
        try:
            response = requests.options(f"{self.base_url}/api/applications", timeout=10)
            cors_headers = [
                'access-control-allow-origin',
                'access-control-allow-methods',
                'access-control-allow-headers'
            ]
            
            present_headers = [h for h in cors_headers if h in response.headers]
            success = len(present_headers) >= 2  # At least 2 CORS headers should be present
            details = f"Status: {response.status_code}, CORS headers: {present_headers}"
            
            self.log_test("CORS Headers", success, details)
            return success
        except Exception as e:
            self.log_test("CORS Headers", False, f"Exception: {str(e)}")
            return False

    def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting DPM Beauty Pageant Backend API Tests")
        print(f"🔗 Testing API at: {self.base_url}")
        print("=" * 60)
        
        # Test basic connectivity first
        if not self.test_root_endpoint():
            print("\n❌ Root endpoint failed - API may be down")
            return False
            
        # Test main functionality
        self.test_create_application()
        self.test_get_applications()
        self.test_create_application_validation()
        self.test_cors_headers()
        
        # Print summary
        print("\n" + "=" * 60)
        print(f"📊 Backend Test Summary: {self.tests_passed}/{self.tests_run} tests passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All backend tests passed!")
            return True
        else:
            print(f"⚠️  {self.tests_run - self.tests_passed} tests failed")
            return False

def main():
    tester = DPMAPITester()
    success = tester.run_all_tests()
    
    # Save test results
    with open('/app/test_reports/backend_test_results.json', 'w') as f:
        json.dump({
            "timestamp": datetime.now().isoformat(),
            "total_tests": tester.tests_run,
            "passed_tests": tester.tests_passed,
            "success_rate": f"{(tester.tests_passed/tester.tests_run)*100:.1f}%" if tester.tests_run > 0 else "0%",
            "results": tester.test_results
        }, f, indent=2)
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())