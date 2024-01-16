<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class InsuranceApprovalController extends Controller
{
    public function createRequest(Request $request){
        $validator= validator::make($request->all(),[
            
        ]);
    }
}
